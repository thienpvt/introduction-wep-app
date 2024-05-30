import PaginationCustom from "components/PaginationCustom";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Card,
  CardText,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "utils/api";
import img from "assets/images/den1.jpg";
import { set } from "react-hook-form";

export default function SearchProducts() {
  const location = useLocation();
  const [categoryName, setCategoryName] = useState();
  const [categoryParentName, setCategoryParentName] = useState();
  const [keyword, setKeyword] = useState();
  const {categoryId} = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState<any[]>([]);
  
  const fetchProducts = async () => {
    setProducts([]);
    try {
      const response = await api.get(`product`, {
        keyword: keyword || "",
        categoryId: categoryId || "",
        page: currentPage - 1,
        perPage: pageSize,
      });
      setProducts(response.content);
      setProductImages(response.content.files);
      setTotalCount(response.totalRecords);
    } catch (e: any) {
      console.error("Fetch error: ", e.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize, keyword, categoryId]);
  useEffect(() => {
    setCurrentPage(1);
    setKeyword(location.state.keyword || "");
    setCategoryName(location.state.categoryName || "");
    setCategoryParentName(location.state.categoryParentName || "");
  }, [location.state]);
  return (
    <>
      <style type="text/css">
        {`
        .cursor-pointer {
          cursor: pointer;
        }
        .custom-hover:hover {
          background-color: #daacac;
        }
        .product-general {
          background-color: #E4E4E4;
        }
        `}
      </style>
      <Container fluid="lg">
        {categoryName && categoryParentName && (
          <Breadcrumb className="mt-2">
            <Breadcrumb.Item active className="fs-1">
              TRANG CHỦ
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="fs-1">
              {categoryParentName}
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="fs-1">
              {categoryName}
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        <Card className="mt-3">
          {products.length > 0 && (
            <Card.Body>
              {!categoryName && <h1>Kết quả tìm kiếm:</h1>}

              <Row className="match-height justify-content-center">
                {products.map((product: any,index) => (
                  <div
                    onClick={() => navigate(`/detail/${product.id}`,{
                      state: { category: product.category },
                    })}
                    className="mb-1"
                    key={product.id}
                    style={{ height: "372px", width: "290px" }}>
                    <Card className="cursor-pointer">
                      {product.files&&product.files.length>0 ?(
                        <Card.Img
                          variant="top"
                          src={`data:${product.files[0].contentType};base64,${product.files[0].data}`}
                          height={250}
                          width={250}
                        />
                      ) : (
                        <Card.Img
                          variant="top"
                          src={img}
                          height={250}
                          width={250}
                        />
                      )}
                      
                      <div className="w-100 custom-hover pb-3 product-general">
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              {product.name.toUpperCase()}
                            </Tooltip>
                          }>
                          <Card.Title
                            className="d-inline-block text-truncate mt-1 px-1"
                            style={{ width: "100%" }}>
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
                  </div>
                ))}
              </Row>
              <PaginationCustom
                totalCount={totalCount}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            </Card.Body>
          )}
        </Card>
      </Container>
    </>
  );
}
