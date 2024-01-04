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
        className="w-full rounded-full px-3 py-2 text-lg shadow-inner focus:shadow-3xl focus:outline-none sm:px-5 sm:py-4 sm:text-xl"
        value={item}
        onChange={e => setItem(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-0.5 m-1 h-8 w-8 rounded-full bg-red-500 text-xs font-bold uppercase text-slate-50 shadow-sm duration-300 hover:bg-red-600 hover:shadow-md active:scale-125 active:shadow-sm sm:right-1 sm:h-12 sm:w-12 sm:text-lg"
      >
        ADD
      </button>
    </form>
  );
}
