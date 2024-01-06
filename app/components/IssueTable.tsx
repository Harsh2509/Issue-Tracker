import { Issue } from "@prisma/client";
import { Badge, Table } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const IssueTable = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/issues");
      setIssues(response.data.reverse());
      //   console.log(issues);
    }
    fetchData();
  }, []);

  return (
    <div className="w-1/3 border-zinc-300 border-2 rounded-lg">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="text-center italic">
              Latest Issues
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue: Issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <p>{issue.title}</p>
                  <Badge
                    color={
                      (issue.status == "OPEN" && "green") ||
                      (issue.status == "CLOSED" && "red") ||
                      "purple"
                    }
                    style={{
                      display: "inline-block",
                      width: "full",
                    }}
                  >
                    {issue.status}
                  </Badge>
                </Table.RowHeaderCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssueTable;
