import { FaUsers, FaEnvelope, FaBuilding } from "react-icons/fa";
import Table from "../components/Table/Table";
import {
  useGetDashboardStatsQuery,
  useGetRecentLettersQuery,
} from "../features/dashboard/api/dashboardApi";

import Card from "../components/Card/Card";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const { data: stats = { users: 0, letters: 0, departments: 0 } } =
    useGetDashboardStatsQuery();

  const { data: recentLetters = [] } = useGetRecentLettersQuery();

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
