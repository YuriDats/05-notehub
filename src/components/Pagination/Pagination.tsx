import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";


interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (selectedPage: number) => void
}

export default function Pagination({totalPages, currentPage, onPageChange}: PaginationProps) {
    if (totalPages <= 1) return null;


    return (
         <ReactPaginate
            pageCount={totalPages}
            onPageChange={(select) => onPageChange(select.selected + 1)}
            forcePage={currentPage -1 }
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            previousLabel="←"
            nextLabel="→"
            breakLabel="..."
            containerClassName={css.pagination}
            pageClassName={css.page}
            pageLinkClassName={css.pageLink}
            activeClassName={css.active}
            activeLinkClassName={css.activeLink}
            previousClassName={css.prev}
            nextClassName={css.next}
            previousLinkClassName={css.navLink}
            nextLinkClassName={css.navLink}
            disabledClassName={css.disabled}
        />
    )
}
