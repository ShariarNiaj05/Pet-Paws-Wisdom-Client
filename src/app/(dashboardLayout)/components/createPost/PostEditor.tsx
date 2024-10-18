"use client";
import { useEffect, useRef, useState } from "react";
// import Quill from "quill";
import "quill/dist/quill.snow.css";

const PostEditor = ({ onContentChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  // let quillInstance: Quill | null = null;
  const [quillInstance, setQuillInstance] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import Quill dynamically to avoid SSR issues
      import("quill").then((Quill) => {
        if (editorRef.current) {
          const quill = new Quill(editorRef.current, {
            theme: "snow",
            modules: {
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            },
            placeholder: "Write your pet story or tip here...",
          });
          setQuillInstance(quill);

          quill.on("text-change", () => {
            onContentChange(quill.root.innerHTML);
          });
        }
      });
    }
  }, [onContentChange]);

  useEffect(() => {
    if (editorRef.current) {
      quillInstance = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["link", "image"],
              [{ list: "ordered" }, { list: "bullet" }],
            ],
            handlers: {
              image: () => handleImageUpload(),
            },
          },
        },
      });
    }

    const handleImageUpload = async () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files ? input.files[0] : null;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);

          // Upload to server
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const { imageUrl } = await response.json();
          const range = quillInstance?.getSelection();
          quillInstance?.insertEmbed(range?.index || 0, "image", imageUrl);
        }
      };
    };
  }, []);

  return <div ref={editorRef} style={{ height: "300px" }} />;
};

export default PostEditor;
