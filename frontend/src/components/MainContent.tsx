import React, { useState, useEffect } from 'react';
import { Part, Warehouse, UpdatedPart } from '../types';
import SearchPart from './SearchPart.tsx';
import ContentHeader from './ContentHeader';
import AddPartModal from './AddPartModal';
import styles from './MainContent.module.css';
import UpdatePartModal from "./UpdatePartModal.tsx";
import DeletePartButton from "./DeletePartButton.tsx";
import UpdatePriceButton from "./UpdatePriceButton.tsx";

interface MainContentProps {
    data: Part[] | Warehouse[] | UpdatedPart[] | null;
    dataType: 'parts' | 'warehouses';
    fetchData: (endpoint: string, type: 'parts' | 'warehouses') => Promise<void>;
}

const MainContent: React.FC<MainContentProps> = ({ data, dataType, fetchData }) => {
    const [searchedPart, setSearchedPart] = useState<Part | Part[] | null>(null);
    const [isAddPartModalOpen, setAddPartModalOpen] = useState(false);
    const [isUpdatePartModalOpen, setIsUpdatePartModalOpen] = useState(false);

    const handleAddPartClick = () => {
      setAddPartModalOpen(true);
    };

    const handleAddPartModalClose = () => {
      setAddPartModalOpen(false);
    };

    const handleSavePart = async (part: Part, warehouseId: number) => {
      try {
        await fetch(`http://localhost:8000/api/addpart/${warehouseId}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(part),
        });
        await fetchData('getallparts', 'parts');
      } catch (error) {
        console.error("Failed to add part: ", error);
      }
    };
    
    const handleDeleteSuccess = async () => {
      await fetchData('getallparts', 'parts');
    }

    const handleUpdateSuccess = async () => {
      await fetchData('getallparts', 'parts');
    }

    const handleUpdatePartClick = () => {
      setIsUpdatePartModalOpen(true);
    };

    const handleUpdatePartModalClose = () => {
      setIsUpdatePartModalOpen(false);
    };

    const handleUpdatePart = async (part: UpdatedPart, partId: number) => {
      try {
        await fetch(`http://localhost:8000/api/updatepart/${partId}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(part),
        });
          await fetchData('getallparts', 'parts');
      } catch (error) {
        console.error("Failed to update part: ", error);
      }
    };

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
                <div className={styles.buttonsContainer}>
                    <div className={styles.searchControls}>
                        <SearchPart onPartFound={handlePartFound} onClear={handleClearSearch} />
                    </div>
                  <button className={styles.button} onClick={handleAddPartClick}>Add Part</button>
                  <button className={styles.button} onClick={handleUpdatePartClick}>Update Part</button>
                </div>
            )}
          <AddPartModal
                isOpen={isAddPartModalOpen}
                onClose={handleAddPartModalClose}
                onSave={handleSavePart}
                defaultId={data ? data.length + 2 : 1}
            />
          <UpdatePartModal
            isOpen={isUpdatePartModalOpen}
            onClose={handleUpdatePartModalClose}
            onSave={handleUpdatePart}
            />
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
                                  <td>
                                    <DeletePartButton partId={part.id} onSuccess={handleDeleteSuccess}/>
                                    <UpdatePriceButton partId={part.id} onSuccess={handleUpdateSuccess}/>
                                  </td>
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
