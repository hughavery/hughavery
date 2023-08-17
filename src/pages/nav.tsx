import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

function Nav() {
  let location = useLocation();
  
  return (
    <header className="flex justify-between px-4 py-2 bg-gray-900 sticky top-0 z-50">
      <div className="flex items-center">
        <Link to="/" className='flex items-center'>
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <h1 className={`text-white text-sm font-semibold hover:text-gray-300 hover:underline md:text-lg ${location.pathname === '/bubbles' ? 'underline' : ''}`}>Hugh Avery</h1>
        </Link>
      </div>
      <nav className="space-x-3 flex items-center">
        <Link to="/about" className={`text-white hover:text-gray-300 hover:underline text-sm md:text-lg ${location.pathname === '/about' ? 'font-semibold underline' : ''}`}>
          About Me
        </Link>
        <Link to="/projects" className={`text-white hover:text-gray-300 hover:underline text-sm md:text-lg ${location.pathname === '/projects' ? 'font-semibold underline' : ''}`}>
          Projects
        </Link>
        <Link to="/experience" className={`text-white hover:text-gray-300 text-sm md:text-lg hover:underline ${location.pathname === '/experience' ? 'font-semibold underline' : ''}`}>
          Experience
        </Link>
      </nav>
    </header>
  );
}

export default Nav;
