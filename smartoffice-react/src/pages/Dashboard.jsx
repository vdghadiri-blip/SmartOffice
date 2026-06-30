import { useEffect, useState } from "react";
import { FaUsers, FaEnvelope, FaBuilding } from "react-icons/fa";
import Table from "../components/Table/Table";
import dashboardService from "../services/dashboardService";

import Card from "../components/Card/Card";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    letters: 0,
    departments: 0,
  });
  const [recentLetters, setRecentLetters] = useState([]);

  useEffect(() => {
    loadStats();

    loadRecentLetters();
  }, []);

  async function loadStats() {
    try {
      const data = await dashboardService.getStats();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  }
// پنج نامه آخر
  async function loadRecentLetters() {
    try {
      const data = await dashboardService.getRecentLetters();

      setRecentLetters(data);
    } catch (error) {
      console.log(error);
    }
  }
console.log(recentLetters);
const columns = [
  {
    field: "letterNumber",
    title: "شماره نامه",
  },
  {
    field: "subject",
    title: "موضوع",
  },
  {
    field: "senderUserId",
    title: "فرستنده",
  },
  {
    field: "createdAt",
    title: "تاریخ",

    render: (row) => new Date(row.createdAt).toLocaleDateString("fa-IR"),
  },
];
  return (
    <div className={styles.container}>
      <Card>
        <FaUsers size={40} className={styles.icon} />

        <h3>کاربران</h3>

        <h1>{stats.users}</h1>
      </Card>

      <Card>
        <FaEnvelope size={40} className={styles.icon} />

        <h3>نامه‌ها</h3>

        <h1>{stats.letters}</h1>
      </Card>

      <Card>
        <FaBuilding size={40} className={styles.icon} />

        <h3>دپارتمان‌ها</h3>

        <h1>{stats.departments}</h1>
      </Card>
      <Card>
        <h2>آخرین نامه‌ها</h2>

        <Table columns={columns} data={recentLetters} />
      </Card>
    </div>
  );
}

export default Dashboard;
