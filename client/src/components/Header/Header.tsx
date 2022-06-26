const Header = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          <div className="flex items-center">
            <div className="text-white">Logo here</div>
            <div className="sm:ml-6 ">
              <div className="flex">
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium">Create</a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium">Analyze</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
