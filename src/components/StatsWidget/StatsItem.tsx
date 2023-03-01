import styles from './statsWidget.module.scss';

type StatsItemProps = {
  stat: number | JSX.Element;
  description: string;
};

const StatsItem = ({ stat, description }: StatsItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.stat}>
        <span>{stat}</span>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default StatsItem;
