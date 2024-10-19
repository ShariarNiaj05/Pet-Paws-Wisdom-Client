"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Switch, Select, SelectItem } from "@nextui-org/react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { createContentApi } from "@/services/contentServices";
import { useUser } from "@/context/user.provider";
import { getCategoryApi, ICategory } from "@/services/getCategory";

const QuillNoSSRWrapper = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);

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
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [allCategory, setAllCategory] = useState<ICategory[]>([]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoryApi();
        setAllCategory(response); // Store the categories
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      body: JSON.stringify(body),
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      isPremium,
      image,
      author: user?._id,
    };
    console.log(payload);
    try {
      await createContentApi(payload);
      // Handle successful creation a success message)
    } catch (error) {
      console.error("Error creating content", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  console.log(category);
  /*  const handleCategoryChange = async () => {
    console.log("clicked");
    let categoryId;
    if (Array.isArray(allCategory)) {
      for (let i = 0; i < allCategory.length; i++) {
        console.log(allCategory);
        return (categoryId = allCategory[i]._id);
      }
      setCategory(categoryId);
      console.log(categoryId);
      return categoryId;
    }
  };
 */
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Body
        </label>
        <QuillNoSSRWrapper
          className="quill-container"
          modules={modules}
          formats={formats}
          value={body}
          onChange={setBody}
          theme="snow"
        />
      </div>

      <Select
        label="Category"
        value={category}
        // onChange={() => handleCategoryChange}
        onChange={(e) => setCategory(e)}
        required
      >
        {allCategory &&
          allCategory?.map((cat: ICategory) => (
            <SelectItem key={cat._id} value={cat._id}>
              {cat.name}
            </SelectItem>
          ))}
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
