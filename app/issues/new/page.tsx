"use client";

import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface issueFormInput {
  title: string;
  description: string;
}

const NewIssue = () => {
  const { register, handleSubmit, control } = useForm<issueFormInput>();
  const router = useRouter();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root>
        <TextField.Input
          placeholder="Title"
          {...register("title")}
        ></TextField.Input>
      </TextField.Root>

      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return <SimpleMDE placeholder="Description" {...field} />;
        }}
      ></Controller>
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssue;
