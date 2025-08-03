import "@/styles/PostForm.css";
import { AddLocationAlt, AddPhotoAlternate, Delete, Widgets } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { MAPBOX_TOKEN, supabase } from "../../client";
import { CircularProgress } from "@mui/material";
import {
  AddressAutofill,
  AddressMinimap,
  Geocoder,
  SearchBox,
} from "@mapbox/search-js-react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function PostForm({editable = false, post=null}) {

  const navigate = useNavigate()
  const {uid} = useContext(UserContext)

  const uploadRef = useRef();
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(editable ? post.file_name : "")
  const [loading, setLoading] = useState(null);
  const [url, setUrl] = useState(editable ? post.imageUrl : "");
  const [caption, setCaption] = useState(editable ? post.caption.replace(/[\r\n]+/g, " ") : "");
  const [location, setLocation] = useState(editable ? post.location : "");
  const [coordinates, setCoordinates] = useState(editable ? post.coordinates : [])

  const handleClick = () => {
    uploadRef.current.click();
  };

  const handleChange = (e) => {
    console.log(typeof e.target.files[0]);
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    console.log(image);

    const uploadImage = async () => {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`post-images/${image?.name}`, image);

      console.log("Data:", data);
      if (error) {
        console.error(error);
      }
      ("");

      setLoading(false);
    };

    if (image) {
      setFileName(image.name)
      uploadImage();
    }
  }, [image]);

  useEffect(() => {
    console.log(loading);

    const getUrl = async () => {
      if (loading === false) {
        const { data, error } = await supabase.storage
          .from("images")
          .createSignedUrl(
            `post-images/${image?.name}`,
            60 * 60 * 24 * 365 * 5
          );

        console.log(image.name);

        error ? console.error(error) : console.log("URL:", data);

        setUrl(data?.signedUrl);
      }
    };

    getUrl();
  }, [loading]);

  const handleDelete = () => {
    const deleteImg = async () => {
      const { data, error } = await supabase.storage
        .from("images")
        .remove([`post-images/${image.name}`]);

      error ? console.log(error) : console.log("Delete Data:", data);

      setUrl("");
    };

    deleteImg();
  };

  useEffect(() => {
    console.log("Image:", image)
  }, [image])

  const handleRetrieve = (e) => {
    console.log(e)

    setLocation(e.features[0].properties.name)

    // console.log(e.features[0].properties.coordinates.latitude)
    const latitude = e.features[0].properties.coordinates.latitude
    // console.log(e.features[0].properties.coordinates.longitude)
    const longitude = e.features[0].properties.coordinates.longitude

    setCoordinates([latitude, longitude])

  }

  const handleSubmit = () => {
    const createPost = async () => {
      const {data, error} = await supabase
        .from('Posts')
        .insert({ 
          user_id: uid,
          caption: caption,
          location: location,
          imageUrl: url,
          file_name: fileName,
          coordinates: coordinates
        })

        error? console.error(error) : console.log("Create Post Data:", data)
        navigate('/home')
        
    }

    createPost()
  }

  const handleUpdate = () => {

    const updatePost = async() => {
      if (post) {

        const {data, error} = await supabase
        .from('Posts')
        .update({
          caption: caption,
          location: location,
          imageUrl: url,
          file_name: fileName,
          coordinates: coordinates
        })
        .eq('post_id', post.post_id)
        .select()

        error ? console.error(error) : console.log("Update Data:", data)

      }
    }

    updatePost()
    navigate("/home")

  }

  return (
    <div className="postForm">
      <div
        className="uploadBox"
        onClick={handleClick}
        style={{ border: url ? "none" : "3px dashed #885A5A", display: "flex", flexDirection: "column", gap: "3em" }}
      >
        <input
          ref={uploadRef}
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        {url ? (
          <div>
            <img src={url} />
          </div>
        ) : loading ? (
          <CircularProgress color="#81A094" />
        ) : (
          <AddPhotoAlternate fontSize="large" />
        )}
      </div>
        {url && <Delete onClick={handleDelete} style={{ marginTop: "-1.5em", cursor: "pointer" }} />}
      <textarea
        value={caption}
        placeholder="Caption"
        onChange={(e) => setCaption(e.target.value)}
      />

      <SearchBox
        accessToken={MAPBOX_TOKEN}
        value={location}
        onChange={e => setLocation(e)}
        onRetrieve={handleRetrieve}
        theme={{
          variables: {
            boxShadow: "none",
            borderRadius: "20px",
            colorBackground: "#fff5f5",
            border: "3px solid #885A5A",
            colorText: "#4d3333",
            fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
          },
        }}
      />
      
      {editable ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
}
