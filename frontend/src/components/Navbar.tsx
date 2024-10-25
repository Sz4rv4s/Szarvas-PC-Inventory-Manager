import React from 'react';
import styles from './Navbar.module.css';

interface NavbarProps {
    onButtonClick: (type: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onButtonClick }) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarHeader}>
                <h2 className={styles.title}>Szarvas PC</h2>
            </div>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => onButtonClick('parts')}>Parts</button>
                <button className={styles.button} onClick={() => onButtonClick('warehouses')}>Warehouses</button>
            </div>
        </nav>
    );
};

export default Navbar;
