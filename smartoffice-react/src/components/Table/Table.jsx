/**
 ************************************************
 *
 * Table.jsx
 *
 * کامپوننت عمومی جدول
 *
 * مسئول:
 * ✔ نمایش اطلاعات
 * ✔ نمایش ستون‌ها
 * ✔ نمایش دکمه ویرایش
 * ✔ نمایش دکمه حذف
 *
 ************************************************
 */

import styles from "./Table.module.css";

function Table({
  // ستون‌های جدول
  columns,

  // اطلاعات جدول
  data,

  // تابع ویرایش (اختیاری)
  onEdit,

  // تابع حذف (اختیاری)
  onDelete,
}) {
  return (
    <table className={styles.table}>
      {/* =========================
           عنوان ستون‌ها
      ========================== */}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field}>{column.title}</th>
          ))}

          {/* اگر عملیاتی وجود داشت ستون عملیات نمایش داده شود */}
          {(onEdit || onDelete) && <th>عملیات</th>}
        </tr>
      </thead>

      {/* =========================
           اطلاعات جدول
      ========================== */}
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.field}>
                {/* اگر render وجود داشت از آن استفاده کن */}
                {column.render ? column.render(row) : row[column.field]}
              </td>
            ))}

            {/* ستون عملیات */}
            {(onEdit || onDelete) && (
              <td className={styles.actions}>
                {/* دکمه ویرایش */}
                {onEdit && (
                  <button
                    className={styles.editButton}
                    onClick={() => onEdit(row)}
                  >
                    ✏️ ویرایش
                  </button>
                )}

                {/* دکمه حذف */}
                {onDelete && (
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(row)}
                  >
                    🗑️ حذف
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}

        {/* اگر اطلاعاتی وجود نداشت */}
        {data.length === 0 && (
          <tr>
            <td
              colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
              className={styles.empty}
            >
              اطلاعاتی برای نمایش وجود ندارد.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
