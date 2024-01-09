import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssuesTable from "../components/IssuesTable";

const Issues = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <div className="m-7">
        <IssuesTable />
      </div>
    </div>
  );
};

export default Issues;
