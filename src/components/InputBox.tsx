import { useState } from "react";

interface InputBoxProps {
  onSubmit: (word: string) => void;
  disabled: boolean;
  error: string | null;
}

export default function InputBox({ onSubmit, disabled, error }: InputBoxProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input.trim().toLowerCase());
    setInput("");
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button onClick={handleSubmit} disabled={disabled}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
