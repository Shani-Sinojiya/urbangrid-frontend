"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  return (
    <div className="flex justify-center items-center w-full mt-10">
      <DeleteForm />
    </div>
  );
};

export default Page;

export function DeleteForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repetPassword, setRepetPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repetPassword) {
      toast.error("Password and Repeat password should be same");
      return;
    }

    const res = await fetch(
      "https://api.urbangrid.shanisinojiya.tech/everything",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (res.ok) {
      toast.success("Everything is Deleted successfully");
    } else {
      toast.error("Everything is not deleted");
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 bg-slate-800 p-8 bg-opacity-60 rounded-md"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Your email" className="text-white" />
        </div>
        <TextInput
          id="email2"
          type="email"
          placeholder="name@flowbite.com"
          required
          shadow
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password2"
            value="Your password"
            className="text-white"
          />
        </div>
        <TextInput
          id="password2"
          type="password"
          required
          shadow
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="repeat-password"
            value="Repeat password"
            className="text-white"
          />
        </div>
        <TextInput
          id="repeat-password"
          type="password"
          required
          shadow
          value={repetPassword}
          onChange={(e) => setRepetPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" required />
        <Label htmlFor="agree" className="flex text-white">
          I agree with the&nbsp; Delete Everything of data
        </Label>
      </div>
      <Button type="submit" color="failure">
        Delete All Data
      </Button>
    </form>
  );
}
