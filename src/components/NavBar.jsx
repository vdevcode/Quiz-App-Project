import logo from "../../public/images/logo.png";

const NavBar = () => {
  return (
    <header className="h-16 bg-green-100 shadow-sm flex items-center fixed top-0 right-0 left-0 z-10">
      <nav className="flex items-center justify-between sm:w-9/12 mx-auto">
        {/* logo */}
        <a href="/">
          <img src={logo} className="sm:w-full w-[60%]" alt="" />
        </a>

        {/* nav items */}
        <div className="flex items-center space-x-5">
          <ul className="sm:flex items-center space-x-5 hidden ">
            <li>
              <a href="/">Giải đáp</a>
            </li>
            <li>
              <a href="/">Tính năng</a>
            </li>
            <li>
              <a href="/">Về chúng tôi</a>
            </li>
          </ul>
          <button className="lg:text-[1rem] text-[.9rem] font-medium lg:px-5 px-2 py-1 border border-primary rounded">
            Đăng nhập
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
