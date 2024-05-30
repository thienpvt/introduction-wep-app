import React, { useRef, useState, useEffect } from "react";
import Products from "./Model/Products";

export default function Categories() {
	const [products, setProducts] = useState<Products[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
		null
	);
	const [productsPerPage] = useState(8);
	const abortControllerRef = useRef<AbortController | null>(null);

	const baseURL = "http://localhost:8888/api";

	const quattranId = "6618e72e3cc2dd1031671253";
	const quatDienId = "6618e72e3cc2dd1031671252";
	const thietBiNhaBepId = "6618e72e3cc2dd1031671251";
	// Fetch products
	useEffect(() => {
		const fetchProducts = async () => {
			if (!currentCategoryId) return;
			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`${baseURL}/product/find-by-category?category=${currentCategoryId}`,
					{ signal: abortControllerRef.current.signal }
				);
				const data = await response.json();
				setProducts(data.content);
			} catch (e: any) {
				if (e.name !== "AbortError") {
					setError(e.message);
					console.error("Fetch error: ", e.message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, [currentCategoryId, currentPage]);

	// Handle category change
	const handleCategoryChange = (categoryId: string) => {
		setCurrentCategoryId(categoryId);
		setCurrentPage(1);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error}. Try again</div>;
	}

	// Logic for displaying current products
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	// Pagination
	const npage = Math.ceil(products.length / productsPerPage);
	const numbers = [];
	for (let i = 1; i <= npage; i++) {
		numbers.push(i);
	}
	const handlePaginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="middle">
			<div className="header-middle">
				<div className="position">
					Trang chủ / {products.length > 0 && products[0].name}
				</div>
				<button onClick={() => handleCategoryChange(quattranId)}>
					Quạt Trần
				</button>
				<button onClick={() => handleCategoryChange(quatDienId)}>
					Quạt Điện
				</button>
				<button onClick={() => handleCategoryChange(thietBiNhaBepId)}>
					Thiết Bị Nhà Bếp
				</button>
			</div>
			<div className="product-category">
				<div className="specific-category">
					{products.length > 0 && products[0].name}
				</div>
				<div className="line"></div>
			</div>
			{products.length > 0 && (
				<div className="total-product">
					{currentProducts.map((product: Products) => (
						<div className="product" key={product.id}>
							<div className="product-image">
								<img src={product.name} alt={product.name} />
							</div>
							<div className="product-general">
								<div className="product-name">
									<h2>{product.name}</h2>
								</div>
								<div className="product-button">
									<button className="contact-button">Liên hệ</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			<div className="pagination">
				<button
					className="page-button"
					onClick={() => handlePaginate(currentPage - 1)}
					disabled={currentPage === 1}>
					Previous
				</button>
				<div className="page-number">
					{numbers.map((number) => (
						<button
							style={{
								cursor: "pointer",
								backgroundColor: "#083cb3",
								color: "white",
								border: "none",
								borderRadius: "5px",
								padding: "5px 10px",
								margin: "0 5px",
							}}
							key={number}
							onClick={() => handlePaginate(number)}
							className={currentPage === number ? "active" : ""}>
							{number}
						</button>
					))}
				</div>
				<button
					style={{
						cursor: "pointer",
						backgroundColor: "#083cb3",
						color: "white",
						border: "none",
						borderRadius: "5px",
						padding: "5px 10px",
						margin: "0 5px",
					}}
					onClick={() => handlePaginate(currentPage + 1)}
					disabled={currentPage === npage}>
					Next
				</button>
			</div>
		</div>
	);
}
