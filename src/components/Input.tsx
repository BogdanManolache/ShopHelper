import { useRef } from 'react';

interface InputProps {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

export default function Input({ item, setItem, handleAdd }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="relative flex w-10/12 items-center"
      onSubmit={e => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a product..."
        required
        className="w-full rounded-full px-5 py-4 text-xl shadow-inner focus:shadow-3xl focus:outline-none"
        value={item}
        onChange={e => setItem(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-1 m-1 h-12 w-12 rounded-full bg-blue-200 font-bold uppercase text-slate-700 shadow-sm duration-300 hover:bg-blue-300 hover:shadow-md active:scale-125 active:shadow-sm"
      >
        ADD
      </button>
    </form>
  );
}
