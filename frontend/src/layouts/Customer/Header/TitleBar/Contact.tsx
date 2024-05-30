import phone from "assets/images/phone.png";

export function Contact() {
  return (
    <div className="contact-container">
      <ul className="contact-list navbar-nav">
        <li className="contact-item nav-item">
          <div className="d-flex align-items-center">
            <img src={phone} alt="" />
            <span className="fw-bold" style={{ color: "white" }}>0986354223</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
