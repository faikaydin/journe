import { NavLink } from "react-router-dom";
import c from "./nav.module.scss";
import Icon from "../../../assets/Icon";
const Nav = () => {
  return (
    <>
      <nav className={c.nav}>
        <ul>
          <li>
            <NavLink
              to={`/`}
              className={({ isActive }) => (isActive ? c.active : "")}
            >
              <Icon.Garden />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/schedule`}
              className={({ isActive }) => (isActive ? c.active : "")}
            >
              <Icon.Schedule />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/tasks`}
              className={({ isActive }) => (isActive ? c.active : "")}
            >
              <Icon.Task />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/reset`}
              className={({ isActive }) => (isActive ? c.active : "")}
            >
              Reset
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Nav;
