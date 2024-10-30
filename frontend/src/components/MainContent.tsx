import React, { useState, useEffect } from 'react';
import { Part, Warehouse } from '../types';
import SearchPart from './SearchPart.tsx';
import ContentHeader from './ContentHeader';
import styles from './MainContent.module.css';

interface MainContentProps {
    data: Part[] | Warehouse[] | null;
    dataType: 'parts' | 'warehouses';
    fetchData: (endpoint: string, type: 'parts' | 'warehouses') => Promise<void>;
}

const MainContent: React.FC<MainContentProps> = ({ data, dataType, fetchData }) => {
    const [searchedPart, setSearchedPart] = useState<Part | Part[] | null>(null);

    useEffect(() => {
        setSearchedPart(null);
    }, [dataType]);

    const handlePartFound = (part: Part | Part[] | null) => {
        if (Array.isArray(part)) {
            setSearchedPart(part);
        } else {
            setSearchedPart(part);
        }
    };

    const handleClearSearch = () => {
        setSearchedPart(null);
        fetchData('getallparts', 'parts');
    };

    return (
        <div className={styles.mainContent}>
            <ContentHeader title="Inventory Manager" />

            {dataType === 'parts' && (
                <div className={styles.searchContainer}>
                    <div className={styles.searchControls}>
                        <SearchPart onPartFound={handlePartFound} onClear={handleClearSearch} />
                    </div>
                </div>
            )}
            {data === null && <p className={styles.welcome}>Welcome!</p>}
            {searchedPart && !Array.isArray(searchedPart) ? (
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
                            <td>€{searchedPart.price}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            ) : Array.isArray(searchedPart) ? (
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
                        {searchedPart.map((part) => (
                            <tr key={part.id}>
                                <td>{part.id}</td>
                                <td>{part.model}</td>
                                <td>{part.brand}</td>
                                <td>€{part.price}</td>
                            </tr>
                        ))}
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
                                    <td>€{part.price}</td>
                                </tr>
                            ))
                            : (data as Warehouse[]).map((warehouse) => (
                                <tr key={warehouse.id}>
                                    <td>{warehouse.id}</td>
                                    <td>{warehouse.name}</td>
                                    <td>{warehouse.city}</td>
                                    <td>{warehouse.address}</td>
                                    <td>{warehouse.capacity} Pallets</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </div>
    );
};

export default MainContent;
