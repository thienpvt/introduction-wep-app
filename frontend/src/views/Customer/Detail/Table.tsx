import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';


export const ProductTable: React.FC<{ product: any | null,categoryName:any }> = ({ product,categoryName }) => {
  if (!product) {
      return <p>Product not found or error fetching product details.</p>;
  }

  return (
    <div className="table-responsive">
      <h1 style={{color:"red"}}>{product.name}</h1>
      <h4>Thông số kĩ thuật</h4>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Thông tin</th>
            <td>Thông số</td>
          </tr>
          <tr className="text-start">
            <th>ID</th>
            <td>{product.id}</td>
          </tr>
          {/* <tr>
            <th>Name</th>
            <td>{product.name}</td>
          </tr> */}
          <tr className="text-start" style={{ display: product.brand ? '' : 'none' }}>
            <th>Thương hiệu</th>
            <td>{product.brand}</td>
          </tr>
          <tr className="text-start">
            <th>Loại</th>
            <td>{categoryName}</td>
          </tr>
          <tr className="text-start" style={{ display: product.model ? '' : 'none' }}>
            <th>Kiểu mẫu</th>
            <td>{product.model}</td>
          </tr>
          <tr className="text-start" style={{ display: product.voltage ? '' : 'none' }}>
            <th >Vôn</th>
            <td>{product.voltage}</td>
          </tr>
          <tr className="text-start" style={{ display: product.power ? '' : 'none' }}>
            <th>Nguồn điện lực</th>
            <td>{product.power}</td>
          </tr>
          {/* <tr>
            <th>Price</th>
            <td>${product.price?.toFixed(2)}</td>
          </tr> */}
          {/* <tr>
            <th>Images</th>
            <td>{product.image}</td>
          </tr> */}
          <tr className="text-start" style={{ display: product.status ? '' : 'none' }}>
            <th>Tình trạng</th>
            <td>{product.status}</td>
          </tr>
          {/* <tr>
            <th>Description</th>
            <td>{product.description}</td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );

};
