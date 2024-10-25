import React from 'react';
import styles from './ContentHeader.module.css';

interface ContentHeaderProps {
    title: string;
    children?: React.ReactNode;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ title, children }) => {
    return (
        <div className={styles.contentHeader}>
            <h2 className={styles.headerTitle}>{title}</h2>
            {children && <div className={styles.additionalContent}>{children}</div>}
        </div>
    );
};

export default ContentHeader;
