import styles from './styles.module.scss';

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <p>
          Feito com ❤ por <strong>Peter Lourenço</strong>{' '}
        </p>
      </div>
    </footer>
  );
}
