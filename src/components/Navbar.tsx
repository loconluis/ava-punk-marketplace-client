import { Link } from "react-router-dom";
import ConnectWalletComponent from "./ConnectWalletComponent";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-2xl">Ava Punks</h1>
        </Link>
        <div className={`block w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col text-center md:p-0 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-900 dark:border-gray-700">
            <li>
              <ConnectWalletComponent />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
