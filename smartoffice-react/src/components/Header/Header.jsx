import styles from "./Header.module.css";
import Button from "../Button/Button";

function Header() {
  const username = localStorage.getItem("username");

  const role = localStorage.getItem("role");

  function logout() {
    localStorage.clear();

    window.location.href = "/";
  }

  return (
    <header className={styles.header}>
      <div className={styles.right}>
        <h2>Smart Office</h2>
      </div>

      <div className={styles.left}>
        <span>👤 {username}</span>

        <span>({role})</span>

        <Button variant="danger" onClick={logout}>
          خروج
        </Button>
      </div>
    </header>
  );
}

export default Header;
