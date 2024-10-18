import CreatePostForm from "@/app/(dashboardLayout)/components/createPost/CreatePostForm";

const NewPostPage = () => {
  const onSubmit = {};
  return (
    <div>
      <CreatePostForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewPostPage;
