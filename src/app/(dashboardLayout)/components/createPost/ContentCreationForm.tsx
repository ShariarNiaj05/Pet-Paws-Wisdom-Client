import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Switch, Select, SelectItem } from "@nextui-org/react";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];
const ContentCreationForm = () => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        value={body}
        onChange={setBody}
        theme="snow"
      />

      <Select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <SelectItem key="tip" value="tip">
          Tip
        </SelectItem>
        <SelectItem key="story" value="story">
          Story
        </SelectItem>
      </Select>

      <Input
        label="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Button onClick={() => fileInputRef.current?.click()}>
          Attach Image
        </Button>
        {image && <p>{image.name}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={isPremium}
          onChange={(e) => setIsPremium(e.target.checked)}
        />
        <span>Premium Content</span>
      </div>

      <Button type="submit" color="primary">
        Create Post
      </Button>
    </form>
  );
};

export default ContentCreationForm;
