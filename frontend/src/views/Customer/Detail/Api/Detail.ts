import React from "react";
import { ProductModel } from "../Model/Product";

async function myRequest(duongdan:string) {
    const response = await fetch(duongdan);
    if(!response.ok){
            throw new Error(`không thể truy cập ${duongdan}`);
    }
    return response.json();
}

export async function laySanPhamTheoDanhMuc(categoryId:string) {
    const response = await fetch(`http://localhost:8888/api/product/find-by-category?category=${categoryId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    // console.log("jj");
    // console.log(data.content);
    return data.content;
  }

export async function layThongTinSanPham(productId: string): Promise<ProductModel | null> {
    const duongDan: string = `http://localhost:8888/api/product/${productId}`;
    let productDetails: ProductModel | null = null;
    
    try {
        const response = await myRequest(duongDan);
        if (response.code === 0 && response.content && typeof response.content === 'object') {
            const item = response.content;
            productDetails = {
                id: item.id,
                name: item.name || '',
                brand: item.brand || '',
                category: item.category || '',
                model: item.model || '',
                voltage: item.voltage || '',
                power: item.power || '',
                price: item.price,
                image: item.image && item.image.length > 0 ? item.image[0] : undefined,
                status: item.status || 0,
                description: item.description && item.description.length > 0 ? item.description.join(', ') : undefined
                
            };
        } else {
            console.error(`Failed to fetch product details: ${response.message}`);
        }
    } catch (error) {
        console.error("Failed to fetch product details:", error);
    }
    
    return productDetails;
}
