"use client";

import { useRouter } from "next/navigation";
import React from "react";

const IssueTitle = ({ title, id }: { title: string; id: number }) => {
  const router = useRouter();
  return (
    <p
      className="pb-2 cursor-pointer hover-link"
      onClick={() => {
        router.push(`/issues/${id}`);
      }}
    >
      {title}
    </p>
  );
};

export default IssueTitle;
