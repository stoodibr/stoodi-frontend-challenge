import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="images/stoodi-logo.png" alt="Logo Stoodi" />
      </div>
    </header>
  );
}
