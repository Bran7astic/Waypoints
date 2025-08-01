import "@/styles/PostForm.css";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../client";
import { CircularProgress } from "@mui/material";

export default function PostForm() {
  const uploadRef = useRef();
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(null)
  const [url, setUrl] = useState("")

  const handleClick = () => {
    uploadRef.current.click();
  };

  const handleChange = (e) => {
    console.log(typeof e.target.files[0])
    setImage(e.target.files[0])
  }

  useEffect(() => {
    console.log(image)

    const uploadImage = async () => {
        const { data, error } = await supabase
        .storage
        .from('images')
        .upload(`post-images/${image?.name}`, image)
        
        console.log("Data:", data)
        if (error) {console.error(error)}''
    }

    if (image) {
        setLoading(true)
        uploadImage()
        setLoading(false)
    }

  }, [image])

  useEffect(() => {
    console.log(loading)

    if (loading === false) {
        const {data} = supabase
        .storage
        .from('images')
        .getPublicUrl(`post-images/${image?.name}`)

        console.log(image.name)
        
        console.log("URL:", data)
        setUrl(data.publicUrl)
    }


  }, [loading])

  return (
    <div className="postForm">
      <div
        className="uploadBox"
        onClick={handleClick}
        style={{ border: "3px dashed #885A5A" }}
      >
        <input
          ref={uploadRef}
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        {url ? (
            <img src={url}/>
        ) : (
            loading ? (
             <CircularProgress/>
            ) : (
             <AddPhotoAlternate fontSize="large" />
            )
        )}

        {/* {loading === null ? (
            <AddPhotoAlternate fontSize="large" />
        )
        : loading===true ? (
            <CircularProgress/>
        )
        : url && (
            <img src={url}/>
        )} */}

      </div>
      <textarea />
      <button>Submit</button>
    </div>
  );
}
