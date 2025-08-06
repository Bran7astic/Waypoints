import { Fade } from "react-awesome-reveal";
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
        <Fade direction="up" triggerOnce>
          <PostForm />
        </Fade>
      </div>
    </div>
  );
}