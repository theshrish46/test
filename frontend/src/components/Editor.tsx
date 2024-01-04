"use client";
import React, { ReactHTMLElement, useState } from "react";
import axios, { Method } from "axios";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { revalidatePath } from "next/cache";
import next from "next";

type DataProps = {
  _id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  content: string;
  authorId: string;
  likes: any;
  createdAt: any;
  updatedAt: any;
};

type TProps = {
  // propTitle?: string;
  // propAuthor?: string;
  // propCategory?: string;
  // propDescription?: string;
  // propValue?: string;
  data?: DataProps | any;
};

const Editor = ({ data }: TProps) => {
  // TODO: Make selector type safe
  type User = {
    id: string | null;
    name: string | null;
    email: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  };
  const user = useSelector((state): User => state.userAuth);
  // console.log(user);

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];
  const [title, setTitle] = useState<string | undefined>(data?.title);
  const [author, setAuthor] = useState<string | undefined>(data?.author);
  const [category, setCategory] = useState<string | undefined>(data?.category);
  const [description, setDescription] = useState<string | undefined>(
    data?.description
  );
  const sanitizedHTML = DOMPurify.sanitize(data?.content);
  const [value, setValue] = useState<string | undefined>(sanitizedHTML);
  const header = {
    Authorization: user.accessToken,
  };

  const router = useRouter();
  const userID = user.id;

  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(value);
    const postData = {
      userID,
      title,
      author,
      description,
      category,
      value,
    };
    const url = data
      ? `http://localhost:8000/blog/edit/${data._id}`
      : "http://localhost:8000/blog/write";
    const method = data ? "put" : "post";

    const res = await axios({
      method: method as Method,
      url,
      data: postData,
      headers: header,
    });
    router.push("/");
  }

  async function deletePost() {
    console.log("deleting post");
    const deletePost = await axios.delete(
      `http://localhost:8000/blog/delete/${data._id}`
    );
    console.log(deletePost);
    router.push("/");
  }

  return (
    <div className="my-10 flex justify-center flex-col items-stretch w-full">
      <form
        className="flex flex-col gap-y-5 justify-center items-center"
        onSubmit={handler}
      >
        <Textarea
          className="p-1 h-auto text-4xl font-semibold break-words border-none focus-visible:ring-0 shadow-none placeholder:text-gray-400 scroll-smooth resize-none"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="w-full flex justify-between items-center">
          <Input
            className="px-1 py-0 h-auto text-xl font-medium border-none focus-visible:ring-0 shadow-none placeholder:text-gray-400"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Input
            className="px-1 py-0 h-auto text-xl font-medium border-none focus-visible:ring-0 shadow-none placeholder:text-gray-400"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none placeholder:text-gray-400 font-semibold"
        ></Textarea>
        <ReactQuill
          className={cn("border-none w-full")}
          theme="snow"
          formats={formats}
          modules={modules}
          value={value}
          onChange={(value) => setValue(value)}
        />
        <div className="flex justify-start items-center gap-x-5 w-full">
          <Button type="submit" className={cn(buttonVariants(), "self-start")}>
            Submit
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className={"bg-destructive"}>Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogDescription>
                  Do you really want to delete the post?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={deletePost} className="bg-destructive">
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  );
};

export default Editor;
