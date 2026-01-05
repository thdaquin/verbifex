import { useState, useEffect, useRef } from "react";

interface InputBoxProps {
  onSubmit: (word: string) => void;
  disabled: boolean;
  error: string | null;
}

export default function InputBox({ onSubmit, disabled, error }: InputBoxProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { // prevent auto-focus on mount (mobile devices)
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.trim().length === 5) { // small delay: ensure UI updates before submitting
      setTimeout(() => {
        onSubmit(value.trim().toLowerCase());
        setInput("");
      }, 100);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        value={input}
        onChange={handleChange}
        disabled={disabled}
        maxLength={5}
        style={{
          fontSize: '16px', // prevents zoom (moble)
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}