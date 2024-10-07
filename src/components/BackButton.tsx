import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button id='back-button' onClick={() => navigate(-1)}>
      <ArrowBackIcon />
    </button>
  );
}

export default BackButton;