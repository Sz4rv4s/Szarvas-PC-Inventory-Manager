import React, { useState } from 'react';
import { Part, Warehouse } from '../types';
import SearchPart from './SearchPart';
import ContentHeader from './ContentHeader';
import styles from './MainContent.module.css';

interface MainContentProps {
    data: Part[] | Warehouse[] | null;
    dataType: 'parts' | 'warehouses';
}

const MainContent: React.FC<MainContentProps> = ({ data, dataType }) => {
    const [searchedPart, setSearchedPart] = useState<Part | null>(null);

    const handlePartFound = (part: Part | null) => {
        setSearchedPart(part);
    };

    return (
        <div className={styles.mainContent}>
            <ContentHeader title="Inventory Manager"/>
            <SearchPart onPartFound={handlePartFound} />
            {searchedPart ? (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Model</th>
                            <th>Brand</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{searchedPart.id}</td>
                            <td>{searchedPart.model}</td>
                            <td>{searchedPart.brand}</td>
                            <td>{searchedPart.price}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            ) : data ? (
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
                <p>Welcome!</p>
            )}
        </div>
    );
};

export default MainContent;
