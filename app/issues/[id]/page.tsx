"use client";

import { Issue } from "@prisma/client";
import { IoIosArrowDown } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import {
  Badge,
  Button,
  DropdownMenu,
  Heading,
  Text,
  TextArea,
} from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UpdateIssue = ({ params }: { params: { id: string } }) => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [description, setDescription] = useState("");
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
    await axios.put(`/api/issues/${issue.id}`, { description });
    router.push(`/issues`);
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

        <TextArea
          value={description}
          className="m=4"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          size="3"
        ></TextArea>
      </div>

      <div className="flex flex-col space-y-4">
        <DropDown></DropDown>
        <Button onClick={editOnClick}>
          <FaEdit />
          Edit Issue
        </Button>
        <Button color="red">Delete Issue</Button>
      </div>
    </div>
  );
};

function DropDown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" size="2">
          Unassigned
          <IoIosArrowDown />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2">
        <DropdownMenu.Item>Unassigned</DropdownMenu.Item>
        <DropdownMenu.Item>In Progress</DropdownMenu.Item>
        <DropdownMenu.Item>Close</DropdownMenu.Item>

        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default UpdateIssue;
