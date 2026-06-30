import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUsers, FaEnvelope, FaCog } from "react-icons/fa";

import Header from "../components/Header/Header";
import styles from "./Layout.module.css";

function Layout() {
  const menuItems = [
    {
      title: "داشبورد",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      title: "کاربران",
      path: "/users",
      icon: <FaUsers />,
    },
    {
      title: "نامه‌ها",
      path: "/letters",
      icon: <FaEnvelope />,
    },
    {
      title: "تنظیمات",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Smart Office</h2>

        <hr className={styles.divider} />

        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>نسخه 1.0</div>
      </aside>

      {/* Content */}
      <div className={styles.content}>
        <Header />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
