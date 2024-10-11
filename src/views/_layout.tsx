import { ReactNode } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface ILayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-gray-300 px-8 pt-8 flex flex-col justify-between">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
