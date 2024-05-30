import banner1 from "assets/images/banner1.png";
import banner2 from "assets/images/banner2.png";
import banner3 from "assets/images/banner3.png";
import producer from "assets/images/producer.png";

export function Banner1() {
  return (
    <div className="container-fluid p-0 mt-100" style={{}}>
      <img src={banner1} className="img-fluid w-100 h-100" alt="..." />
    </div>
  );
}

export function Banner2() {
  return (
    <div className="container-fluid p-0">
      <img src={banner2} className="w-100 img-fluid" alt="..." />
    </div>
  );
}

export function Banner3() {
  return (
    <div>
      <div className="container-fluid p-0" style={{ height: "50vh" }}>
        <img
          src={banner3}
          className="img-fluid w-100 h-100"
          style={{ objectFit: "contain" }}
          alt="..."
        />
      </div>
      <div>
        <h1 className="bold" style={{ color: "#0B3963" }}>
          TỰ HÀO LÀ NHÀ PHÂN PHỐI CHÍNH HÃNG CỦA
        </h1>
      </div>
      <div className="container-fluid p-0" style={{ height: "20vh" }}>
        <img
          src={producer}
          className="img-fluid w-100 h-100"
          style={{ objectFit: "contain" }}
          alt="..."
        />
      </div>
    </div>
  );
}
