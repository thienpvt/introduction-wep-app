import React, { useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Edit, Eye, Trash } from "react-feather";
import { set } from "react-hook-form";

export default function DatatableServer({data, totalRows,onChange, onClick,categories}:any) {
  const [columns, setColumns] = useState<TableColumn<unknown>[]>([]);
  const [products, setProducts] = useState<any[]>(data);
  const [pending, setPending] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(totalRows);
  const [perPage, setPerPage] = React.useState(10); // [5, 10, 15, 20, 25, 30, 40, 50, 75, 100]

  const handleClick=(type: string, rowId:string)=>{
    return () => {
      onClick(type,rowId)
    }
  }
  useMemo(() => {
    setProducts(data);
    setTotalRecords(totalRows);
    setPending(false);
  }, [data,totalRows]);
  useEffect(() => {
    setColumns([
      {
        name: "STT",
        selector: (row: any) => (products.indexOf(row) + 1)+(page-1)*10,
        width:"80px",
        sortable: true,
      },
      {
        name:"Thao tác",
        cell: (row: any) => {
          return (
            <div>
              <Eye className="mx-1" color="blue" size={15} onClick={handleClick('view',row)}/>
              <Edit className="mx-1" color="yellow" size={15} onClick={handleClick('edit',row)}/>
              <Trash className="mx-1" color="red" size={15} onClick={handleClick('delete',row.id)}/>
            </div>
          );
        },
        width:"120px",
        // center: Boolean(true)

      },
      {
        name: "Tên sản phẩm",
        selector: (row: any) => row.name,
        sortable: true,
        width:"200px",
      },
      {
        name: "Hãng sản xuất",
        selector: (row: any) => row.brand,
        sortable: true,
        width:"200px"
      },
      {
        name: "Loại sản phẩm",
        selector: (row: any) => categories.find((category:any)=>category.value==row.category)?.label,
        sortable: true,
        width:"200px"
      },
      {
        name: "Ngày tạo",
        selector: (row: any) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "",
        sortable: true,
      },
      {
        name: "Trạng thái",
        selector: (row: any) => row.status === 1 ? "Hoạt động" : "Ngừng hoạt động",
      },
    ]);
  },[products,categories]);
  useEffect(() => {
    console.log("page",page);
    onChange(page,perPage);
    setPending(true);
  }, [page,perPage]);
  return (
    <DataTable
      columns={columns}
      data={products}
      progressPending={pending}
      pagination
      pointerOnHover 
      paginationRowsPerPageOptions={[10,25,50,100]}
      paginationPerPage={perPage}
      paginationServer
      paginationTotalRows={totalRecords}
      onChangeRowsPerPage={setPerPage}
      onChangePage={setPage}
      paginationDefaultPage={1}
      />
  );
}
