import React, { useState } from 'react';
import styles from './SearchPart.module.css';
import { Part } from "../types";
import Modal from './Modal';

interface SearchPartProps {
    onPartFound: (part: Part | null | Part[]) => void;
    onClear: () => void;
}

const SearchPart: React.FC<SearchPartProps> = ({ onPartFound, onClear }) => {
    const [showInput, setShowInput] = useState(false);
    const [searchType, setSearchType] = useState<'id' | 'name'>('id');
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchPart = async () => {
        try {
            setLoading(true);
            setError(null);

            const endpoint = searchType === 'id' ? `getpart/${query}` : `search/${query}`;
            const response = await fetch(`http://localhost:8000/api/${endpoint}`);

            if (!response.ok) {
                throw new Error('Failed to fetch part');
            }

            const data = await response.json();
            onPartFound(data);
        } catch (err) {
            setError(searchType === 'id' ? 'Part not found' : 'No parts found with this name');
            console.error(err);
            onPartFound(null);
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (query) {
            fetchPart();
        }
    };

    const handleClear = () => {
        onClear();
        setQuery('');
        setError(null);
    };

    const handleToggleSearchType = () => {
        setSearchType((prev) => (prev === 'name' ? 'id' : 'name'));
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.searchPart}>
            <button className={styles.button} onClick={() => setShowInput(!showInput)}>
                {showInput ? 'Hide Search' : 'Show Search'}
            </button>
            {showInput && (
                <div className={styles.inputContainer}>
                    <div className={styles.toggleContainer}>
                        <span className={styles.toggleLabel}>
                            {searchType === 'name' ? 'Search Name' : 'Search ID'}
                        </span>
                        <div
                            className={`${styles.toggleSwitch} ${searchType === 'id' ? styles.toggleSwitchActive : ''}`}
                            onClick={handleToggleSearchType}
                        >
                            <div className={styles.toggleCircle}></div>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={`Enter Part ${searchType === 'id' ? 'ID' : 'Name'}`}
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

export default SearchPart;
