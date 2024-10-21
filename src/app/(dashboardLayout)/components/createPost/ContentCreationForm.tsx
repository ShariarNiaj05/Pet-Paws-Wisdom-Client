/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getCategoryApi();
        // console.log("API Response:", response);

        if (Array.isArray(response)) {
          setAllCategories(response);
        } else {
          // console.error("Unexpected API response format:", response);
          setError("Unexpected data format received from the server.");
        }
      } catch (error) {
        // console.error("Error fetching categories", error);
        setError("Failed to fetch categories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  function logCookies() {
    console.log("Current cookies:", document.cookie);
  }

  function checkCookies() {
    console.log("All cookies:", document.cookie);
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="));
    console.log("Access Token cookie:", accessToken);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!user || !user._id) {
      setError("User is not authenticated. Please log in and try again.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      title,
      body,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      isPremium,
      // image,
      author: user._id,
    };
    console.log(payload);
    try {
      logCookies();
      checkCookies();
      const response = await createContentApi(payload);
      console.log("Content creation response:", response);
      // Handle successful creation (e.g., show a success message, redirect, etc.)
      // You can add your success handling logic here
    } catch (error: any) {
      console.error("Error creating content", error);
      if (error.response && error.response.data) {
        setError(
          error.response.data.message ||
            "An error occurred while creating the content."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
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
  console.log(user);
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
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        {Array.isArray(allCategories) && allCategories.length > 0 ? (
          allCategories.map((cat: ICategory) => (
            <SelectItem key={cat._id} value={cat._id}>
              {cat.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem key="" value="">
            No categories available
          </SelectItem>
        )}
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
      <div>
        <p>Current user ID: {user?._id || "Not available"}</p>
      </div>
      <Button type="submit" color="primary" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Post"}
      </Button>
    </form>
  );
};

export default ContentCreationForm;
