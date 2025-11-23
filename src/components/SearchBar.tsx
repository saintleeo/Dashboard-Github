import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        ...styles.container,
        ...(isFocused ? styles.containerFocus : {})
      }}
    >
      <input
        type="text"
        placeholder="Buscar repositório (ex: facebook/react)..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />
      <button 
        type="submit" 
        style={styles.button}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      >
        Search
      </button>
    </form>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: "6px",
    padding: "4px",
    marginBottom: "30px",
    transition: "border-color 0.2s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  },
  containerFocus: {
    border: "1px solid #58a6ff",
    boxShadow: "0 0 0 3px rgba(88, 166, 255, 0.3)",
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    border: "none",
    color: "#c9d1d9",
    fontSize: "16px",
    padding: "10px 16px",
    outline: "none",
  },
  button: {
    backgroundColor: "#238636",
    color: "#ffffff",
    border: "1px solid rgba(240, 246, 252, 0.1)",
    borderRadius: "6px",
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  buttonHover: {
    backgroundColor: "#2ea043",
  }
};