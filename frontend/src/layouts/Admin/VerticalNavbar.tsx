import token from "plugins/token";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { redirect, useLocation, useNavigate } from "react-router-dom";

function VerticalNavbar({username}:any) {
  const [name]=useState(username)
  const navigate=useNavigate();
  const location=useLocation();
  const handleLogOut=()=>{
    redirect("/login");
    token.clearToken();
  }
  const checkActive=(path:string)=>{
    let regexPath=new RegExp(path);
    // console.log(regexPath.test(location.pathname)+" "+location.pathname);
    return regexPath.test(location.pathname);
  }
  return (
    <>
    <Navbar fixed="top">
        <Container className="shadow-lg rounded p-2 bg-body" fluid="lg">
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={()=>navigate('/admin/product')} active={checkActive('^\/admin\/product[#/]?.*$')}>
                <h4>Sản phẩm</h4>
              </Nav.Link>
              <Nav.Link onClick={()=>navigate('/admin/category')} active={checkActive('^\/admin\/category[#/]?.*$')}>
                <h4>Danh mục sản phẩm</h4>
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              <NavDropdown title={name} id="basic-nav-dropdown" >
                {/* <NavDropdown.Header>Admin</NavDropdown.Header> */}
                {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item> */}
                <NavDropdown.Item href="#action/3.3">Đổi mật khẩu</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={handleLogOut}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
  );
}

export default VerticalNavbar;
