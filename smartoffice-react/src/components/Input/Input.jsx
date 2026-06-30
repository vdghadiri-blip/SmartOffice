/**
 ************************************************
 *
 * Input.jsx
 *
 * کامپوننت عمومی Input
 *
 * از تمام خصوصیات استاندارد input
 * پشتیبانی می‌کند.
 *
 ************************************************
 */

import styles from "./Input.module.css";

function Input({
  className = "",

  ...props
}) {
  return <input className={`${styles.input} ${className}`} {...props} />;
}

export default Input;
