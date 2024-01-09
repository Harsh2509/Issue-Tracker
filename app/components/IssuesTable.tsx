"use client";
import { Issue } from "@prisma/client";
import { Badge, Button, DropdownMenu, Table } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const IssuesTable = () => {
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [all, setAll] = useState<Issue[] | null>(null);
  const [option, setOption] = useState("All");
  const router = useRouter();

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await axios.get(`/api/issues`);
        setIssues(response.data);
        setAll(response.data);
      } catch (error) {
        console.error(`Error on calling endpoint: ` + error);
        return;
      }
    }
    fetchIssues();
  }, []);

  return (
    <div style={{ minHeight: "200vh" }}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft" size="2">
            {option}
            <IoIosArrowDown />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="2">
          <DropdownMenu.Item
            onClick={() => {
              setOption("All");
              setIssues(all);
            }}
          >
            All
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              setOption("Open");
              const openIssues = all?.reduce(
                (accumulator: Issue[], currentValue: Issue) => {
                  if (currentValue.status === "OPEN") {
                    accumulator.push(currentValue);
                  }
                  return accumulator;
                },
                []
              );
              setIssues(openIssues == undefined ? [] : openIssues);
            }}
          >
            Open
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              setOption("In Progress");
              const inProgressIssues = all?.reduce(
                (accumulator: Issue[], currentValue: Issue) => {
                  if (currentValue.status === "IN_PROGRESS") {
                    accumulator.push(currentValue);
                  }
                  return accumulator;
                },
                []
              );
              setIssues(inProgressIssues == undefined ? [] : inProgressIssues);
            }}
          >
            In Progress
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              setOption("Closed");
              const closedIssues = all?.reduce(
                (accumulator: Issue[], currentValue: Issue) => {
                  if (currentValue.status === "CLOSED") {
                    accumulator.push(currentValue);
                  }
                  return accumulator;
                },
                []
              );
              setIssues(closedIssues == undefined ? [] : closedIssues);
            }}
          >
            Closed
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues?.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell
                  width="30%"
                  className="cursor-pointer hover:text-cyan-600"
                  onClick={() => {
                    router.push(`/issues/${issue.id}`);
                  }}
                >
                  {issue.title}
                </Table.RowHeaderCell>
                <Table.Cell width="30%">
                  <Badge
                    color={
                      (issue.status == "OPEN" && "green") ||
                      (issue.status == "CLOSED" && "red") ||
                      "purple"
                    }
                  >
                    {issue.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell width="30%">{`${issue.createdAt}`}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesTable;
