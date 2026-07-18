import styles from "./Header.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/slice/authSlice";

function Header() {

const dispatch = useDispatch();

const { user } = useSelector((state) => state.auth);

function handleLogout() {
  dispatch(logout());

  localStorage.clear();

  window.location.href = "/";
}

  return (
    <header className={styles.header}>
      <div className={styles.right}>
        <h2>Smart Office</h2>
      </div>

      <div className={styles.left}>
        <span>👤 {user?.username}</span>

        <span>({user?.role})</span>

        <Button variant="danger" onClick={logout}>
          خروج
        </Button>
      </div>
    </header>
  );
}

export default Header;
