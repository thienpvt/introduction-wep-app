import DatatableServer from "components/Admin/Product/DatatableServer";
import FormProduct from "components/Admin/Product/FormProduct";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import api from "utils/api";
import notify from "utils/notify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function ProductAdmin() {
  const [level1, setLevel1] = useState([]);
  const [selectedLevel1, setSelectedLevel1] = useState<any>([]);
  const [level2, setLevel2] = useState([]);
  const [optionLevel2, setOptionLevel2] = useState([]);
  const [selectedLevel2, setSelectedLevel2] = useState("");
  const [keyword, setKeyword] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [typeModal, setTypeModal] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any|undefined>();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const [lgShow, setLgShow] = useState(false);


  const updatePage = (page: number, perPage: number) => {
    setPage(page);
    setPerPage(perPage);
  };
  const fetchDropdown = async () => {
    try {
      const response = await api.get(`category/dropdown`);
      setLevel1(response.content.level1);
      setLevel2(response.content.level2);
    } catch (e: any) {
      console.error("Fetch error: ", e.message);
    }
  };
  const fetchProducts = async () => {
    setData([]);
    try {
      const res = await api.get("product", {
        keyword: keyword,
        categoryId: selectedLevel2,
        page: page - 1,
        perPage: perPage,
      });
      setData(res.content);
      setTotalRows(res.totalRecords);
    } catch (error) {
      notify.error("Lỗi khi lấy dữ liệu");
    }
  };
  const handleClick =(type: string, rowData: any = undefined) => {
    switch (type) {
      case "view":
        setModalTitle("Xem chi tiết sản phẩm");
        setSelectedProduct(rowData);
        setTypeModal("view");
        break;
      case "edit":
        setModalTitle("Cập nhật sản phẩm");
        setSelectedProduct(rowData);
        setTypeModal("edit");
        break;
      case "insert":
        setModalTitle("Thêm mới sản phẩm");
        setSelectedProduct(undefined);
        setTypeModal("add");
        break;
      case "delete":
        Swal.fire({
          title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            api.delete(`product/${rowData}`).then((res) => {
              if (res?.code == 0) {
                notify.success("Xóa sản phẩm thành công");
                fetchProducts();
              }
            }).catch((e) => {
              notify.error("Xóa sản phẩm thất bại");
            });
          }
        });
        break;
    }
    if (type != "delete") setLgShow(true);
  };
  useEffect(() => {
    fetchProducts();
  }, [page, perPage]);
  useEffect(() => {
    fetchDropdown();
  }, []);
  useEffect(() => {
    console.log(selectedLevel1);
    if (selectedLevel1)
      setOptionLevel2(
        level2.filter((item: any) => item.parentId === selectedLevel1.value)
      );
    else setOptionLevel2([]);
    setSelectedLevel2("");
  }, [selectedLevel1]);
  return (
    <Container className="p-0">
      <Breadcrumb>
        <Breadcrumb.Item active>Admin</Breadcrumb.Item>
        <Breadcrumb.Item active>Quản lý sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Body className="">
          <Row>
            <Col md={4}>
              <Form.Label htmlFor="inputPassword5">Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Nhập tên sản phẩm"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
            </Col>
            <Col md={4}>
              <Form.Label htmlFor="inputPassword6">Phân loại cấp 1</Form.Label>
              <Select
                id="inputPassword6"
                placeholder="Chọn phân loại cấp 1"
                noOptionsMessage={() => "Không có dữ liệu"}
                isClearable
                value={selectedLevel1}
                options={level1}
                onChange={(value: any) => {
                  setSelectedLevel1(value);
                }}
              />
            </Col>
            <Col md={4}>
              <Form.Label htmlFor="inputPassword7">Phân loại cấp 2</Form.Label>
              <Select
                id="inputPassword7"
                placeholder="Chọn phân loại cấp 2"
                noOptionsMessage={() => "Không có dữ liệu"}
                isClearable
                options={optionLevel2}
                value={selectedLevel2}
                onChange={(value: any) => {
                  setSelectedLevel2(value);
                }}
              />
            </Col>
            <Col className="text-center mt-3" gap={2}>
              <Button 
              variant="primary" 
              className="mx-2"
              onClick={()=>fetchProducts()}>
                Tìm kiếm
              </Button>{" "}
              <Button
                variant="primary"
                className="mx-2"
                onClick={()=>handleClick("insert")}>
                Thêm mới
              </Button>{" "}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <DatatableServer
            data={data}
            totalRows={totalRows}
            onChange={updatePage}
            categories={level2}
            onClick={handleClick}
          />
        </Card.Body>
      </Card>
      <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProduct type={typeModal} level1={level1} level2={level2} data={selectedProduct||{}} onActionSuccess={()=>fetchProducts()}/>
        </Modal.Body>
      </Modal>
      
    </Container>
  );
}
