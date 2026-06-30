/**
 ************************************************
 *
 * Select.jsx
 *
 * کامپوننت عمومی Select
 *
 ************************************************
 */

import styles from "./Select.module.css";

function Select({ children, className = "", ...props }) {
  return (
    <select className={`${styles.select} ${className}`} {...props}>
      {children}
    </select>
  );
}

export default Select;
