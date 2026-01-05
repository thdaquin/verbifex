import { useState, useEffect, useRef } from "react";

interface InputBoxProps {
  onSubmit: (word: string) => void;
  disabled: boolean;
  error: string | null;
  wordLength: number;
}

export default function InputBox({ onSubmit, disabled, error, wordLength }: InputBoxProps) {
  const [input, setInput] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (inputRef.current && !disabled) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInput(value);
    
    if (localError) {
      setLocalError(null);
    }
    
    if (value.trim().length === wordLength) {
      setTimeout(() => {
        onSubmit(value.trim());
        setInput("");
        setTimeout(() => inputRef.current?.focus(), 100);
      }, 100);
    }
  };

  return (
    <div className="input-wrapper">
      <input
        ref={inputRef}
        value={input}
        onChange={handleChange}
        disabled={disabled}
        maxLength={wordLength}
        placeholder={`${wordLength} letters...`}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <div className="error-space">
        {localError && <p className="error-message">{localError}</p>}
      </div>
    </div>
  );
}