import { LINKS } from './constants';
import Link from '../../components/Link';
import Logo from '../../components/Icons/Logo';

const Header = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <Logo className="fill-white w-8" />
              <h1 className="text-white ml-3">MindTracker</h1>
            </div>
            <div className="sm:ml-6 ">
              <div className="flex">
                {LINKS.map((link, idx) => (
                  <Link key={idx} href={link.url}>{link.title}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
