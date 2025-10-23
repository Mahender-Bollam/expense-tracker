import React from 'react';
import { Plus, DollarSign } from 'lucide-react';
import styles from '../styles/Header.module.css';
import { HoveredButton } from '../types/types';

interface HeaderProps {
  onAddClick: () => void;
  hoveredButton: HoveredButton;
  setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>>;
}

const Header: React.FC<HeaderProps> = ({ onAddClick, hoveredButton, setHoveredButton }) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>
          <DollarSign color="#6366f1" size={32} />
          Expense Tracker
        </h1>
        <p className={styles.subtitle}>Manage your daily expenses efficiently</p>
      </div>
      <button
        className={`${styles.addButton} ${hoveredButton === 'add' ? styles.addButtonHover : ''}`}
        onClick={onAddClick}
        onMouseEnter={() => setHoveredButton('add')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <Plus size={20} />
        Add Expense
      </button>
    </div>
  );
};

export default Header;