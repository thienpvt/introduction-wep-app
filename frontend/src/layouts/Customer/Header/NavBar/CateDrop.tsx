import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { NavLink } from "react-router-dom";
import "./CateDrop.css";

interface DropProps {
  toggleName: string;
  items: Array<any>;
  className?: string;
};

export function CateDrop(props: DropProps) {
  const toggleName = props.toggleName;
  const items = props.items;
  const className = (props.className) ? props.className : "d-flex justify-content-center flex-grow-1";
  return (
    <>
      <style type="text/css">
        {`
    .nav-link:hover {
      background-color: #4984A5;
    }
    .nav-link.show {
      background-color: #4984A5;
    }

    .btn-menu:hover {
      background-color: #4984A5;
      font-weight: bold;
      color: white;
    }
    .menu-item {
      color: #000000;
    }
    .btn-menu:hover .menu-item {
      color: white;
    }
    `}
      </style>
      <Dropdown className={className}>
        <Dropdown.Toggle
          className="nav-link flex-grow-1 text-white fw-bold rounded-0"
         
          id="dropdown-basic">
          {toggleName}
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100 flex-grow-1 text-white fw-bold rounded-0 mt-0 px-3 border-0">
          {items.map((item, index) => (
            // <div className="btn-menu flex-grow-1 px-2">
            <NavLink
              key={item.id}
              className="dropdown-item w-100 btn-menu menu-item flex-grow-1 link-underline link-underline-opacity-0 rounded-0"
              to={{pathname:`/category/${item.id}`}}
              state={{
                categoryName: item.name,
                categoryParentName: toggleName,
              }}
            >
              {item.name}
            </NavLink>

            // </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
