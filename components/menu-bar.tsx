export const MenuBar = () => {
  return (
    <div className="bg-gray-800 p-4 absolute bottom-0 w-full z-10">
      <div className="container mx-auto flex justify-center">
        <a href="#" className="text-white mr-4">
          Item 1
        </a>
        <a href="#" className="text-white mr-4">
          Item 2
        </a>

        <a href="#" className="text-white mr-4">
          Item 3
        </a>
        <a href="#" className="text-white">
          Item 4
        </a>
      </div>
    </div>
  );
};
