import { useState } from 'react';
import { FormControl, InputGroup, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
export function SearchBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const handleInput = (e:any) => {
    setKeyword(e.target.value);
    if (e.key === 'Enter') {
      handleSearchQuery(keyword);
    }
  };
  const handleSearchQuery = (keyword: string) => {
    navigate('/searchProducts', { state: { keyword: keyword} })
  };
  return (
      <InputGroup  className="searchbar-container px-5" style={{ maxWidth: '800px', minWidth: '200px'}}
 >
          <FormControl
            placeholder="Nhập từ khoá tìm kiếm..."
            aria-label="Search bar"
            aria-describedby="basic-addon2"
            className=""
            onKeyUp={handleInput}
          // value={searchQuery}
          // onChange={handleSearchChange}
          style={{ border: '0px', fontStyle: 'italic', }}
          />
          <Button className="btn btn-primary"
            type="button"
            aria-label="Search"
            onClick={() => handleSearchQuery(keyword)}
          >
            <i className="fa-solid fa-magnifying-glass "></i>
          </Button>
      </InputGroup>
  );
}
