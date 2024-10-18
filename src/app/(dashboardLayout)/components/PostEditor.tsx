// components/PostEditor.tsx

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const PostEditor = ({ onContentChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  let quillInstance: Quill | null = null;

  useEffect(() => {
    if (editorRef.current) {
      quillInstance = new Quill(editorRef.current, {
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

      quillInstance.on("text-change", () => {
        onContentChange(quillInstance!.root.innerHTML);
      });
    }

    return () => {
      if (quillInstance) {
        quillInstance = null;
      }
    };
  }, [onContentChange]);

  return <div ref={editorRef} style={{ height: "300px" }} />;
};

export default PostEditor;
