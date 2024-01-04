"use client";
import { useForm } from "react-hook-form";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

type TProps = {
  postId: string;
};

const Comment = ({ postId }: TProps) => {
  const user = useSelector((state) => state.userAuth);
  const userId = user.id;
  const [comment, setComment] = useState("");
  async function commentHandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const res = axios.post(
        `http://localhost:8000/comment/comment/${postId}`,
        {
          userId,
          postId,
          comment,
        }
      );
      const { data } = await res;
      const { post, user } = await data;
      console.log(user, post);
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div className="w-full mx-auto">
      <form className="flex flex-col gap-y-5" onSubmit={commentHandler}>
        <Textarea
          className="resize-none h-24 w-full text-base text-gray-900 font-medium"
          placeholder="Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></Textarea>
        <Button type="submit" className="w-1/5">
          Comment
        </Button>
      </form>
    </div>
  );
};

export default Comment;
