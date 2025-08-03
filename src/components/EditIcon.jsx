import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function EditIcon({post_id}) {

  const navigate = useNavigate()

  return (
    <Edit
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/home/edit/${post_id}`);
      }}
    />
  );
}
