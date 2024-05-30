import { Outlet } from 'react-router-dom';
import { Header } from "layouts/Customer/Header";
import { Footer } from "layouts/Customer/Footer";
import React from 'react';

export function Customer() {
  return (
    <React.Fragment>
      <div className="App">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </React.Fragment>
  );
}
