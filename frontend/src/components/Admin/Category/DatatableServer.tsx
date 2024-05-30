import React, { useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Eye, Edit, Trash } from "react-feather";

export default function DatatableServer({data, totalRows,onClick, onChange,parent}:any) {
  const [columns, setColumns] = useState<TableColumn<unknown>[]>([]);
  const [categories, setCategories] = useState<any[]>(data);
  const [pending, setPending] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(totalRows);
  const [perPage, setPerPage] = React.useState(10); // [5, 10, 15, 20, 25, 30, 40, 50, 75, 100]

  const handleClick=(type: string, rowId:string)=>{
    return () => {
      onClick(type,rowId)
    }
  }
  useEffect(() => {
    console.log("data",data);
    setCategories(data);
    setTotalRecords(totalRows);
    setPending(false);
  }, [data,totalRows]);
  useEffect(() => {
    setColumns([
      {
        name: "STT",
        selector: (row: any) => (categories.indexOf(row) + 1)+(page-1)*10,
        sortable: true,
        width:"80px",
      },
      {
        name:"Thao tác",
        cell: (row: any) => {
          return row.level!=1&&(
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
        name: "Tên loại sản phẩm",
        selector: (row: any) => row.name,
        sortable: true,
      },
      {
        name: "Level",
        selector: (row: any) => row.level,
      },
      {
        name: "Loại sản phẩm cha",
        selector: (row: any) => parent.find((item:any)=>item.value==row.parentId)?.label,
        sortable: true,
      },
      {
        name: "Trạng thái",
        selector: (row: any) => row.status==1?"Hoạt động":"Không hoạt động",
        sortable: true,
      },
    ]);
  },[categories]);
  useEffect(() => {
    console.log("page",page);
    onChange(page,perPage);
  }, [page,perPage]);
  return (
    <DataTable
      columns={columns}
      data={categories}
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
