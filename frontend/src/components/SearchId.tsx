import React, { useState } from 'react';
import styles from './SearchId.module.css';
import { Part } from "../types";
import Modal from './Modal';

interface SearchIdProps {
    onPartFound: (part: Part | null) => void;
    onClear: () => void;
}

const SearchId: React.FC<SearchIdProps> = ({ onPartFound, onClear }) => {
    const [showInput, setShowInput] = useState(false);
    const [partId, setPartId] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchPart = async (id: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`http://localhost:8000/api/getpart/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch part');
            }

            const part = await response.json();
            onPartFound(part);
        } catch (err) {
            setError('Part not found');
            console.error(err);
            onPartFound(null);
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (partId) {
            fetchPart(partId);
        }
    };

    const handleClear = () => {
        onClear();
        setPartId('');
        setError(null);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.searchPart}>
            <button className={styles.button} onClick={() => setShowInput(!showInput)}>
                {showInput ? 'Hide Search' : 'Search Id'}
            </button>
            {showInput && (
                <div className={styles.inputContainer}>
                    <input
                        type="number"
                        value={partId}
                        onChange={(e) => setPartId(e.target.value)}
                        placeholder="Enter Part ID"
                        className={styles.input}
                    />
                    <button className={styles.searchButton} onClick={handleSearch} disabled={loading}>
                        {loading ? 'Loading...' : 'Search'}
                    </button>
                    <button className={styles.clearButton} onClick={handleClear}>
                        Clear
                    </button>
                </div>
            )}
            {showModal && error && (
                <Modal
                    message={error}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default SearchId;