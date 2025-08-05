import { useEffect, useState } from "react";
import { supabase } from "../../client";
import PostCard from "./PostCard";
import "@/styles/Feed.css";
import { CircularProgress } from "@mui/material";
import PostView from "./PostView";
import MapView from "./MapView";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [debounceVal, setDebounceVal] = useState(searchVal);
  const [view, setView] = useState("post");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase.from("Posts").select();

      if (debounceVal) {
        query = query.or(
          `caption.ilike.%${debounceVal}%, location.ilike.%${debounceVal}%`
        );
      } else {
        const order = sortBy == "likes" ? "likes" : "created_at"
        query = query.order(`${order}`, { ascending: false });
      }

      const { data, error } = await query;
      error ? console.error(error) : setPosts(data);
    };

    fetchPosts();
  }, [debounceVal, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(searchVal);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchVal]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontWeight: view === "post" ? "bold" : "normal",
            cursor: "pointer",
            color: view == "post"  && "#81A094"
          }}
          onClick={() => setView("post")}
        >
          Posts View
        </h3>

        <h3
          style={{
            fontWeight: view === "map" ? "bold" : "normal",
            cursor: "pointer",
            color: view == "map"  && "#81A094"
          }}
          onClick={() => setView("map")}
        >
          Map View
        </h3>
      </div>

      {view === "post" ? (
        <>
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            style={{ margin: "2em" }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2em",
            }}
          >
            <h4>
              <b>Sort by:</b>
            </h4>

            <p
              onClick={() => setSortBy("date")}
              style={{
                fontWeight: sortBy === "date" && "bold",
                cursor: "pointer",
                color: sortBy == "date"  && "#81A094"
              }}
            >
              Date Created
            </p>

            <p
              onClick={() => setSortBy("likes")}
              style={{
                fontWeight: sortBy === "likes" && "bold",
                cursor: "pointer",
                color: sortBy == "likes"  && "#81A094"
              }}
            >
              Most Liked
            </p>
          </div>

          {/* <div className="feedContainer">
            {posts.length > 0 ? (
              posts.map((item) => <PostCard key={item.post_id} {...item} />)
            ) : (
              <CircularProgress color="#81A094" />
            )}
          </div> */}
          <PostView posts={posts}/>
        </>
      ) : (
        <MapView posts={posts}/>
      )}
    </div>
  );
}
