import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import categoryWall from "../../../assets/images/categorywall.png";
import category1 from "../../../assets/images/category-1.png";
import category2 from "../../../assets/images/category-2.png";
import category3 from "../../../assets/images/category-3.png";
import category4 from "../../../assets/images/category-4.png";
import category5 from "../../../assets/images/category-5.png";
import category6 from "../../../assets/images/category-6.png";
export function FeaturedProduct() {
  let featured = [
    { name: "BÓNG LED BULB", image: category1 },
    { name: "APTOMAT", image: category2 },
    { name: "ĐÈN ỐP TRẦN", image: category3 },
    { name: "QUẠT SẠC TÍCH ĐIỆN", image: category4 },
    { name: "ĐÈN LED PANEL", image: category5 },
    { name: "QUẠT THÔNG GIÓ", image: category6 }]

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center my-5 mx-auto">
      <div className="rounded-0 me-5 d-none d-md-block">
        <img src={categoryWall} className="img-fluid" alt="Vertical Product" />
      </div>
      <Row xs={2} md={3} className="g-4">
        {featured.map((product, _) => (
          <Col key={product.name} className="">
            <Card className="rounded-0 border-0 m-auto">
              <Card.Img variant="top" className="m-auto" src={product["image"]} />
              <Card.Body>
                <Card.Title className="fw-bold">
                <div className="border-0 rounded-3 bg-body-secondary py-2">
                {product["name"]}
                </div>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row >
    </div>
  );
}

