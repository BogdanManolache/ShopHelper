import { BsCart4 } from 'react-icons/bs';

export default function Header() {
  return (
    <header className="z-10 mx-auto my-10 flex items-center gap-4 p-4">
      <BsCart4 className="h-8 w-8 text-slate-800 sm:h-10 sm:w-10" />
      <h1 className="text-2xl font-bold text-slate-800 sm:text-4xl">
        ShopHelper
      </h1>
    </header>
  );
}
