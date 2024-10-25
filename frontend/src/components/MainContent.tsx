import React from 'react';
import { Part, Warehouse } from '../types';
import styles from './MainContent.module.css';

interface MainContentProps {
    data: Part[] | Warehouse[] | null;
    dataType: 'parts' | 'warehouses';
}

const MainContent: React.FC<MainContentProps> = ({ data, dataType }) => {
    return (
        <div className={styles.mainContent}>
            <div className={styles.contentHeader}>
                <h2 className={styles.headerTitle}>Inventory Manager</h2>
            </div>
            {data ? (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            {dataType === 'parts' ? (
                                <>
                                    <th>ID</th>
                                    <th>Model</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                </>
                            ) : (
                                <>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Address</th>
                                    <th>Capacity</th>
                                </>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {dataType === 'parts'
                            ? (data as Part[]).map((part) => (
                                <tr key={part.id}>
                                    <td>{part.id}</td>
                                    <td>{part.model}</td>
                                    <td>{part.brand}</td>
                                    <td>{part.price}</td>
                                </tr>
                            ))
                            : (data as Warehouse[]).map((warehouse) => (
                                <tr key={warehouse.id}>
                                    <td>{warehouse.id}</td>
                                    <td>{warehouse.name}</td>
                                    <td>{warehouse.city}</td>
                                    <td>{warehouse.address}</td>
                                    <td>{warehouse.capacity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className={styles.welcome}>Welcome!</p>
            )}
        </div>
    );
};

export default MainContent;