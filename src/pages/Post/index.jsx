import PostForm from "./PostForm";

export default function Post() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h1>Post</h1>
        <PostForm />
      </div>
    </div>
  );
}