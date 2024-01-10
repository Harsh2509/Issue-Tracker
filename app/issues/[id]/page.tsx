"use client";

import { Issue } from "@prisma/client";
import { IoIosArrowDown } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import SimpleMDE from "react-simplemde-editor";

import { Badge, Button, DropdownMenu, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UpdateIssue = ({ params }: { params: { id: string } }) => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("Unassigned");
  const router = useRouter();

  useEffect(() => {
    if (!params || !params.id) {
      setLoading(false);
      return;
    }
    async function fetchIssue() {
      try {
        const response = await axios.get(`/api/issues/${params.id}`);
        setIssue(response.data);
        setDescription(response.data.description);
        const optn =
          response.data.status == "OPEN"
            ? "Unassigned"
            : response.data.status == "IN_PROGRESS"
            ? "In Progress"
            : "Close";
        setOption(optn);
      } catch (err) {
        console.error("Error fetching issue: ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchIssue();
  }, [params]);

  if (loading) return <div>Loading...</div>;

  if (!issue) return <div>Issue Not found</div>;

  const editOnClick = async () => {
    const optn =
      option == "Unassigned"
        ? "OPEN"
        : option == "In Progress"
        ? "IN_PROGRESS"
        : "CLOSED";
    try {
      const updateResponse = await axios.put(`/api/issues/${issue.id}`, {
        description,
        option: optn,
      });

      if (updateResponse) {
        router.push(`/issues`);
      } else {
        console.error(
          "Something went wrong while calling /api/issues/[id] for updation"
        );
      }
    } catch (error) {
      console.error(
        "Encountering error with sending request to endpoint for updation"
      );
      return;
    }
  };

  const handleDelete = async () => {
    try {
      const deleteResponse = await axios.delete(`/api/issues/${issue.id}`);

      if (deleteResponse) {
        router.push(`/issues`);
      } else {
        console.error(
          "Something went wrong while calling /api/issues/[id] for deletion"
        );
      }
    } catch (error) {
      console.error(
        "Encountering error with sending request to endpoint for deletion"
      );
      return;
    }
  };

  return (
    <div className="flex justify-around">
      <div className="space-y-5 basis-2/3">
        <Heading size="8">{issue.title}</Heading>
        <div className="inline-block mt-3 space-x-4">
          <Badge
            color={
              (issue.status == "OPEN" && "green") ||
              (issue.status == "CLOSED" && "red") ||
              "purple"
            }
          >
            {issue.status}
          </Badge>
          <Text>{`${issue.updatedAt}`}</Text>
        </div>
        <SimpleMDE
          placeholder="Description"
          value={description}
          onChange={(value) => {
            setDescription(value);
          }}
        ></SimpleMDE>
      </div>

      <div className="flex flex-col space-y-4">
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
                setOption("Unassigned");
              }}
            >
              Unassigned
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                setOption("In Progress");
              }}
            >
              In Progress
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                setOption("Close");
              }}
            >
              Close
            </DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item
              shortcut="⌘ ⌫"
              color="red"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Button onClick={editOnClick}>
          <FaEdit />
          Edit Issue
        </Button>
        <Button color="red" onClick={handleDelete}>
          Delete Issue
        </Button>
      </div>
    </div>
  );
};

export default UpdateIssue;
