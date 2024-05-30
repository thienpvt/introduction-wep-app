import DatatableServer from "components/Admin/Category/DatatableServer";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
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
import api from "utils/api";
import FormCategory from "components/Admin/Category/FormCategory";
import Swal from "sweetalert2";
import notify from "utils/notify";

export default function CategoryAdmin() {
  const [level1, setLevel1] = useState([]);
  const [selectedLevel1, setSelectedLevel1] = useState<any>([]);
  const [keyword, setKeyword] = useState("");

  const [modalTitle, setModalTitle] = useState("");
  const [typeModal, setTypeModal] = useState("");
  const [selectedCategory, setselectedCategory] = useState<any|undefined>();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const [lgShow, setLgShow] = useState(false);
  const handleClick = (type: string, rowData: any = undefined) => {
    switch (type) {
      case "view":
        setModalTitle("Xem chi tiết loại sản phẩm");
        setselectedCategory(rowData);
        setTypeModal("view");
        break;
      case "edit":
        setModalTitle("Cập nhật loại sản phẩm");
        setselectedCategory(rowData);
        setTypeModal("edit");
        break;
      case "insert":
        setModalTitle("Thêm mới loại sản phẩm");
        setselectedCategory(undefined);
        setTypeModal("add");
        break;
      case "delete":
        Swal.fire({
          title: "Bạn có chắc chắn muốn xóa loại sản phẩm này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            api.delete(`category/${rowData}`).then((res) => {
              if (res?.code == 0) {
                notify.success("Xóa sản phẩm thành công");
                fetchCategories();
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
  const updatePage = (page: number, perPage: number) => {
    setPage(page);
    setPerPage(perPage);
  };
  const fetchDropdown = async () => {
    try {
      const response = await api.get(`category/dropdown`);
      setLevel1(response.content.level1);
    } catch (e: any) {
      console.error("Fetch error: ", e.message);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await api.get("category", {
        name: "",
        level: "",
        page: page - 1,
        perPage: perPage,
      });
      setData(res.content);
      setTotalRows(res.totalRecords);

      console.log(data);
    } catch (error) {
      console.log("Failed to fetch dropdown items:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [page, perPage]);
  useEffect(() => {
    fetchDropdown();
  }, []);
  return (
    <Container className="p-0">
      <Breadcrumb>
        <Breadcrumb.Item active>Admin</Breadcrumb.Item>
        <Breadcrumb.Item active>Quản lý danh mục sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Label htmlFor="inputPassword5">
                Tên loại sản phẩm
              </Form.Label>
              <Form.Control
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Nhập tên loại sản phẩm"
                onChange={(e) => {setKeyword(e.target.value)}}
              />
            </Col>
            <Col md={6}>
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
            <Col className="text-center mt-3" gap={2}>
              <Button variant="primary" className="mx-2"
              onClick={()=>fetchCategories()}>
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
            onClick={handleClick}
            parent={level1}
          />
        </Card.Body>
      </Card>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
           {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><FormCategory type={typeModal} level1={level1} data={selectedCategory||{}} onActionSuccess={()=>fetchCategories()}></FormCategory></Modal.Body>
      </Modal>
      
    </Container>
  );
}
