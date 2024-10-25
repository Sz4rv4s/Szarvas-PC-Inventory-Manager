
import React, { useState } from 'react';
import styles from './SearchPart.module.css';
import {Part} from "../types.ts";

interface SearchPartProps {
    onPartFound: (part: Part | null) => void;
}

const SearchPart: React.FC<SearchPartProps> = ({ onPartFound }) => {
    const [showInput, setShowInput] = useState(false);
    const [partId, setPartId] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (partId) {
            fetchPart(partId);
        }
    };

    return (
        <div className={styles.searchPart}>
            <button className={styles.button} onClick={() => setShowInput(!showInput)}>
                {showInput ? 'Hide Search' : 'Search Part'}
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
                </div>
            )}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default SearchPart;