import { noteFetch } from "../../services/noteService";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";

export default function App() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState<string>("");
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, text],
    queryFn: () => noteFetch(page, text),
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
        <SearchBox text={text} onChange={handleChange} />
        {/* Пагінація */}
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
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
