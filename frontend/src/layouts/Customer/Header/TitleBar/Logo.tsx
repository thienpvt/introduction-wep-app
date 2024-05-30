import logo from "assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";


export function Logo() {
  const navigate = useNavigate();
  return (
    <div className="logo-container">
      <a className="logo navbar-brand m-0" onClick={()=>navigate('/')}>
        <img src={logo} className="img-fluid" style={{ maxWidth: "100px" }} alt="Logo" />
      </a>
    </div>
  );
}
