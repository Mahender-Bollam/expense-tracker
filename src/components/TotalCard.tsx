import React from 'react';
import styles from '../styles/TotalCard.module.css';

interface TotalCardProps {
  total: number;
}

const TotalCard: React.FC<TotalCardProps> = ({ total }) => (
  <div className={styles.totalCard}>
    <p className={styles.totalLabel}>Total Expenses</p>
    <p className={styles.totalAmount}>${total}</p>
  </div>
);

export default TotalCard;