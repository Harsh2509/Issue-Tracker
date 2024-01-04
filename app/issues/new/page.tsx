"use client";

import { TextField, TextArea, Button } from "@radix-ui/themes";
import React from "react";

const newIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title"></TextField.Input>
      </TextField.Root>
      <TextArea placeholder="Description"></TextArea>
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default newIssue;
