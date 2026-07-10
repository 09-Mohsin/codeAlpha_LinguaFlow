import { useEffect, useRef } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, type, visible }) {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', copy: '📋' };

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${visible ? styles.show : ''}`}
      role="alert"
      aria-live="polite"
    >
      <span className={styles.icon}>{icons[type] || icons.info}</span>
      <span>{message}</span>
    </div>
  );
}
