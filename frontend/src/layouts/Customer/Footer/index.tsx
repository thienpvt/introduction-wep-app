import zalo from "assets/images/Zalo.png";
import facebook from "assets/images/Facebook.png";
import app from "assets/images/app.png";
import logo from "assets/images/logo.jpg";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer-container text-white row " style={{ backgroundImage: "linear-gradient(to right, #0b3963, #12426f, #184b7c, #1d5488, #66abc9)" }}>
      <div className="d-flex navbar-brand col-md-2 justify-content-center align-items-center">
        <img className="w-100 m-4  d-none d-md-block" src={logo} alt="Logo" />
      </div>

      <div className="col-md-5 pt-4 justify-content-center align-items-center" style={{ textAlign: "start" }}>
        <h2 className="fw-bold text-white">CÔNG TY TNHH MINH TÚ ELECTRIC</h2>
        <h5 className="bold">Địa chỉ: Nam Định</h5>
        <h5 className="bold">Số điện thoại: 0986354223</h5>
        <h5 className="bold">Hotline: 0986354223</h5>
        <h5 className="bold">Email: MinhTuElectric@gmail.com</h5>
      </div>
      <div className="d-flex col-md-5 mb-3 justify-content-center align-items-end">
        <a href="#"><img src={zalo} alt="Zalo" className="rounded " /></a>
        <a href="#"><img src={app} alt="Zalo" className="rounded" /></a>
        <a href="https://www.facebook.com/congtyminhtu.vbnd/"><img src={facebook} alt="Facebook" className="rounded" /></a>
      </div>

    </footer>
  );
}
