import Pagination from 'react-bootstrap/Pagination';
import { usePagination,DOTS } from './usePagination';
export default function PaginationCustom({onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,}: any) {
    const paginationRange:any = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize
    });
  
    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }
  
    const onNext = (last:boolean =false) => {
      if (last) {
        onPageChange(paginationRange[paginationRange.length - 1]);
      } else
      onPageChange(currentPage + 1);
    };
  
    const onPrevious = (first:boolean =false) => {
      if (first) {
        onPageChange(1);
      } else
      onPageChange(currentPage - 1);
    };
  
    let lastPage = paginationRange[paginationRange.length - 1];
  return (
     
    <Pagination className='justify-content-center'>
      <Pagination.First onClick={()=>onPrevious(true)} disabled={currentPage==1}/>
      <Pagination.Prev onClick={()=>onPrevious()} disabled={currentPage==1}/>
      {paginationRange.map((pageNumber : any) => {
        if (pageNumber === DOTS) {
          return <Pagination.Ellipsis />;
        }
        return (
          
          <Pagination.Item key={pageNumber} active={pageNumber==currentPage} onClick={() => onPageChange(pageNumber)}>{pageNumber}</Pagination.Item>
        );
      })}
      <Pagination.Next onClick={()=>onNext} disabled={currentPage === lastPage}/>
      <Pagination.Last onClick={()=>onNext(true)} disabled={currentPage === lastPage}/>
    </Pagination>
    
  )
}
