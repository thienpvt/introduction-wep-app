import { useEffect, useState, CSSProperties } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Card,
  CardText,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
  Carousel
} from "react-bootstrap";
import "./Detail.css";
import { ProductTable } from "./Table";
import "./Detail.css";
import api from "utils/api";
import DarkVariantExample from "./Carousels";
import img from "assets/images/den1.jpg";
import Swal from "sweetalert2";


export function Detail() {
  const location = useLocation();
  const [product, setProduct] = useState<any | null>(null);
  const [productImages, setProductImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const { productId } = useParams<{ productId: string }>();
  const [categoryName, setCategoryName] = useState<any | null>(null);
  const [parentCategoryName, setParentCategoryName] = useState<any | null>(null);
  const category = location.state.category;
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  

  const imageStyle: CSSProperties = {
    maxHeight: "30%",
    maxWidth: "30%",
    margin: "auto",
    objectFit: "contain",
  };

  useEffect(() => {
    async function fetchProductAndSimilar() {
      if (productId) {
        Swal.fire({
          title: 'Loading...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        try {
          // Fetch product details and similar products
          const fetchedProduct = await api.get(`product/${productId}`);
          setProduct(fetchedProduct.content.product);
          setProductImages(fetchedProduct.content.files);
          setSimilarProducts(fetchedProduct.content.similarProducts);
          setCategoryName(fetchedProduct.content.categoryName);
          setParentCategoryName(fetchedProduct.content.parentCategoryName);
        } catch (error) {
          setError("Hiện tại chúng tôi không thể tải chi tiết sản phẩm. Vui lòng thử lại");
          Swal.fire({
            text: 'Hiện tại chúng tôi không thể tải chi tiết sản phẩm. Vui lòng thử lại',
          });
        } finally {
          setLoading(false);
          Swal.close();
        }
      } else {
        setError("Hiện tại chúng tôi không thể tải chi tiết sản phẩm. Vui lòng thử lại");
        Swal.fire({
          text: 'Hiện tại chúng tôi không thể tải chi tiết sản phẩm. Vui lòng thử lại.',
        });
        
      }
      setLoading(false);
    }

    fetchProductAndSimilar();
  }, [productId]);

  if (loading) {
    // return <div className="loading-bar">Loading</div>;
    return null;
  }
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const filteredSimilarProducts = similarProducts.filter(
    (product) => product.id !== productId
  );

  // Group similar products into sets of 3
  const groupedProducts = [];
  console.log(similarProducts.length)
  for (let i = 0; i < filteredSimilarProducts.length; i += 3) {
    groupedProducts.push(filteredSimilarProducts.slice(i, i + 3));
  }

  return (
    <Container className="mt-3">
      <Breadcrumb>
        <Breadcrumb.Item active className="text-uppercase fw-bold">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active className="text-uppercase fw-bold">{parentCategoryName}</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-bold">{categoryName}</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-bold">{product?.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <div>
                <DarkVariantExample images={productImages} />
              </div>
            </Col>
            <Col md={6}>
              <ProductTable product={product} categoryName={categoryName} />
              <Button variant="secondary" active>
                <h2>Giá bán sản phẩm: <span style={{ color: "red" }}>Liên hệ</span></h2>
              </Button>
            </Col>
          </Row>

          <div>
            <h2 className="header-containerr col-md-5 col-12 mt-3">MÔ TẢ SẢN PHẨM</h2>
            <div className="header-liner"></div>
            <div className="bold mt-2">
              <ul>
                {product && product.description ? (
                  product.description.map((item: string, index: number) => (
                    <li key={index} className="text-start"><strong>{item.split(":")[0]} :</strong>{item.split(":")[1]}</li>
                  ))
                ) : (
                  <p></p>
                )}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="header-containerr col-md-5 col-12">SẢN PHẨM TƯƠNG TỰ</h2>
            <div className="header-liner"></div>
            <div className="d-flex justify-content-center">
              <style type="text/css">
                {`
                  .cursor-pointer {
                    cursor: pointer;
                  }
                  .custom-hover:hover {
                    background-color: #daacac;
                  }
                  .custom-hover: {
                    background-color: 'white';
                  }
                `}
              </style>
              <Carousel className="w-50 carousel carousel-dark slide">
                {groupedProducts.map((group, groupIndex) => (
                  <Carousel.Item key={groupIndex}>
                    <Row>
                      {group.map((product: any) => (
                        <Col key={product.id} xs={4}>
                          <Card
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(`/detail/${product.id}`, {
                                state: { category: product.category },
                              })
                            }
                          >
                            {product.files && product.files.length > 0 ? (
                              <Card.Img
                                variant="top"
                                src={`data:${product.files[0].contentType};base64,${product.files[0].data}`}
                                height={250}
                                width={270}
                              />
                            ) : (
                              <Card.Img
                                variant="top"
                                src={img}
                                height={250}
                                width={270}
                              />
                            )}
                            <div className="w-100 custom-hover pb-3">
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    {product.name.toUpperCase()}
                                  </Tooltip>
                                }
                              >
                                <Card.Title
                                  className="d-inline-block text-truncate mt-1 px-1"
                                  style={{ width: "100%" }}
                                >
                                  {product.name.toUpperCase()}
                                </Card.Title>
                              </OverlayTrigger>
                              <CardText className="mb-2">
                                <span className="fst-italic text-danger border border-danger py-1 px-2 rounded border-2">
                                  LIÊN HỆ
                                </span>
                              </CardText>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
