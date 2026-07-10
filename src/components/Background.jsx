import styles from './Background.module.css';

export default function Background() {
  return (
    <div className={styles.canvas} aria-hidden="true">
      <div className={styles.grid} />
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
    </div>
  );
}
