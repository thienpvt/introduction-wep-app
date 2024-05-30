import { NavLink } from 'react-router-dom';
import { CateDrop } from './CateDrop';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';
import axios from 'axios';


export function NavBar() {
  const [dropdownItems, setDropdownItems] = useState([[], [], []]);


  useEffect(() => {
    const fetchDropDownItems = async (dropdownId: string) => {
      try {
        const res = await axios.get(`http://localhost:8888/api/category/find-by-parent-id?parentId=${dropdownId}`);
        setDropdownItems((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[parseInt(dropdownId.substring(dropdownId.length - 1))] = res.data['content'];
          return updatedItems;
        });
      } catch (error) {
        console.log("Failed to fetch dropdown items:", error);
      }
    }
    fetchDropDownItems("6618e3aa3cc2dd10315fe620");
    fetchDropDownItems("6618e3aa3cc2dd10315fe621");
    fetchDropDownItems("6618e3aa3cc2dd10315fe622");
  }, []);

  const expand = "lg"

  return (
    <Navbar key={expand} expand={expand} className="p-0"
      style={{ backgroundColor: "#0A3053" }}>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              LOẠI THIẾT BỊ
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ backgroundColor: "#0A3053" }}>
            <Nav className="flex-grow-1">
              <div className="nav-item d-flex justify-content-center flex-grow-1">
                <NavLink className="nav-link w-100 px-2 text-white fw-bold link-underline link-underline-opacity-0" to="/" >TRANG CHỦ</NavLink>
              </div>
              <CateDrop key={1} toggleName="THIẾT BỊ CHIẾU SÁNG" items={dropdownItems[0]}/>
              <CateDrop key={2} toggleName="ĐIỆN DÂN DỤNG" items={dropdownItems[1]}/>
              <CateDrop key={3} toggleName="THIẾT BỊ GIA DỤNG" items={dropdownItems[2]}/>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
    </Navbar>
  );
}
