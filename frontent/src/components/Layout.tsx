import React from "react";
import Header from "./Header";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <div >
        <Header/>
        <main className="">{children}</main>
      </div>
    </>
  );
};

export default Layout;