import { noteFetch } from "../../services/noteService";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../Modal/Modal";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [page, setPage] = useState(2);
  const [perPage, setPerPage] = useState(20);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, perPage, text],
    queryFn: () => noteFetch(page, perPage, text),
    placeholderData: keepPreviousData,
  });

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    1000
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  console.log(data?.notes);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <input
          className={css.input}
          type="text"
          placeholder="Search notes"
          defaultValue={text}
          onChange={handleChange}
        />
        {/* Пагінація */}
        {isSuccess && data.totalPages > 1 && (
          <>
            <ReactPaginate
              pageCount={data.totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          </>
        )}
        <button className={css.button} onClick={handleOpen}>
          Create note +
        </button>
      </header>

      {isOpen && <Modal onClose={onClose} />}
      {(data?.notes?.length ?? 0) > 0 && <NoteList notes={data?.notes ?? []} />}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}
    </div>
  );
}
