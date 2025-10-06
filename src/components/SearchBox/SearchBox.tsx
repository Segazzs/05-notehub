import css from "./SearchBox.module.css";
import type { DebouncedState } from "use-debounce";

interface SearchBoxProps {
  text: string;
  onChange: DebouncedState<
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >;
}

export default function SearchBox({ text, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={text}
      onChange={onChange}
    />
  );
}
