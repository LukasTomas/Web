import { NavLink } from "react-router-dom";

interface Props {
  options: {
    name: string;
    href: string;
  }[];
}

function Navbar({ options }: Props) {
  //    <a className="nav-link active" aria-current="page" href="/">Home</a>

  return (
    <ul className="navbar-nav">
      {options.map((option) => (
        <li key={option.name} className="nav-item">
          <NavLink className="nav-link" to={option.href}>
            {option.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
