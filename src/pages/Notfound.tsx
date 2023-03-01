import styles from './styles/Notfound.module.scss';

const Notfound = () => {
  return (
    <div className={styles.notFoundCountaier}>
      <figure className={styles.figure}>
        <img className={styles.img} src="/images/img404.webp" alt="error-404" />
        <figcaption className={styles.figcaption}>
          <h2 className={styles.title}>Error 404 - page not found</h2>
          <h2 className={styles.text}>
            Please, keep calm and return to previous page
          </h2>
        </figcaption>
      </figure>
    </div>
  );
};

export default Notfound;
