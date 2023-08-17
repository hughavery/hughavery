import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'

function Nav() {
  return (
    <header className="flex justify-between px-4 py-2 bg-gray-900">
      <div className="flex items-center">
      <Link to="/"><img src={logo} alt="Logo" className="w-10 h-10 mr-2" /></Link>
        <h1 className="text-white text-lg font-semibold">Hugh Avery</h1>
      </div>
      <nav className="space-x-4 flex items-center">
        <Link to="/about" className="text-white hover:text-gray-300">
          About Me
        </Link>
        <Link to="/projects" className="text-white hover:text-gray-300">
          Projects
        </Link>
        <Link to="/experience" className="text-white hover:text-gray-300">
          Experience
        </Link>
      </nav>
    </header>
  );
}

export default Nav;
