import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // se não digitar nada, usa popular
        let query = text;
        if (!query) {
          query = "stars:>1";
        }
        onSearch(query);
        
      }}
      style={{ marginBottom: 20 }}
    >
      <input
        type="text"
        placeholder="Buscar repositório..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: 8, width: 250, marginRight: 10 }}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
