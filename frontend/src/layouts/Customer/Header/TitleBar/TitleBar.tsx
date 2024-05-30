import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { Contact } from "./Contact";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react';

function determineDisplay(width: number) {
  if (width < 768) {
    return false
  } else { return true }

}

export function TitleBar() {
  useEffect(() => {
    const handleResize = () => {
      const newHeight = determineDisplay(window.innerWidth);
      setNavbarHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);


    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [displayornot, setNavbarHeight] = useState<boolean>(true);
  return (
    <div>
      {displayornot && (
        <Navbar className="px-5" style={{ backgroundImage: "linear-gradient(to right, #0b3963, #12426f, #184b7c, #1d5488, #66abc9)" }}>
          <Container fluid>
            <Logo />
            <SearchBar />
            <Contact />
          </Container>
        </Navbar>
      )}
    </div>
  );
}
