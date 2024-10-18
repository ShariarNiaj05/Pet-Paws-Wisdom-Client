// components/CreatePostForm.tsx

import { useState } from "react";
import PostEditor from "./PostEditor";
import CategorySelector from "./CategorySelector";
import PremiumContentCheckbox from "./PremiumContentCheckbox";
import { Button, Input } from "@nextui-org/react";

const CreatePostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  const handleSubmit = () => {
    const postData = {
      title,
      body,
      category,
      isPremium,
    };
    onSubmit(postData);
  };

  return (
    <div>
      <Input
        fullWidth
        label="Post Title"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <PostEditor onContentChange={setBody} />
      <CategorySelector onCategoryChange={setCategory} />
      <PremiumContentCheckbox
        isPremium={isPremium}
        onTogglePremium={() => setIsPremium(!isPremium)}
      />
      <Button onClick={handleSubmit}>Create Post</Button>
    </div>
  );
};

export default CreatePostForm;
