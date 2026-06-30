import styles from "./Table.module.css";

function Table({ columns, data, onEdit, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field}>{column.title}</th>
          ))}

          {(onEdit || onDelete) && <th>عملیات</th>}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.field}>
                {column.render ? column.render(row) : row[column.field]}
              </td>
            ))}

            {(onEdit || onDelete) && (
              <td>
                {onEdit && <button onClick={() => onEdit(row)}>✏️</button>}

                {onDelete && <button onClick={() => onDelete(row)}>🗑️</button>}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
