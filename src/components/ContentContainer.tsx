import { FC, useState } from "react";
import Text from "./Text";
import NavElement from "./nav-element";

interface Props {
  children: React.ReactNode;
}

export const ContentContainer: React.FC<Props> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex flex-1 flex-col justify-between h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>

      {/* Overlay for Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-base-100 shadow-lg z-50 transform transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="p-4 menu gap-6">
          <li>
            <Text
              variant="heading"
              className="font-extrabold tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10"
            >
              Menu
            </Text>
          </li>
          <li>
  <NavElement
    label="Home"
    href="/"
  />
</li>
<li>
  <NavElement
    label="Read"
    href="/read"
  />
</li>
<li>
  <NavElement
    label="Upload"
    href="/upload"
  />
</li>

        </ul>
      </div>

      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-indigo-500 text-white md:hidden"
        onClick={toggleDrawer}
      >
        {isDrawerOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
};
