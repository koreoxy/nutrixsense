export const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 absolute top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Logo</div>
        <div className="">
          <a href="#" className="text-white mr-4">
            Home
          </a>
          <a href="#" className="text-white mr-4">
            About
          </a>
        </div>
      </div>
    </nav>
  );
};
