import {  useState } from "react";
import css from "./App.module.css";
import Modal from "../Modal/Modal";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetchNotes from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce} from "use-debounce";
import NoteForm from "../NoteForm/NoteForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const perPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);


const { data, isError, isLoading } = useQuery({
  queryKey: ["notes", currentPage, debouncedSearch],
  queryFn: () =>
    fetchNotes({
      page: currentPage,
      perPage,
      search: debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
    }),
  retry: false,
  placeholderData: keepPreviousData,
});


  const handleSudmit = (newValue: string) => {
    setSearch(newValue);
    setCurrentPage(1);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {isError && <ErrorMessage/>}
          {isLoading && <Loader/>}
          
          {<SearchBox text={search} onChange={handleSudmit} />}
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}><NoteForm onClose={()=> setIsModalOpen(false)}/></Modal>
          )}
        </header>
        {data && data.notes.length > 0 && <NoteList notes={ data.notes} />}
      </div>
    </>
  );
}
