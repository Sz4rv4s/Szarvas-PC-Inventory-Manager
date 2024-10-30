import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import { Part, Warehouse } from './types';
import styles from './App.module.css';

const App: React.FC = () => {
    const [data, setData] = useState<Part[] | Warehouse[] | null>(null);
    const [dataType, setDataType] = useState<'parts' | 'warehouses'>('warehouses');

    const fetchData = async (endpoint: string, type: 'parts' | 'warehouses') => {
        try {
            const response = await fetch(`http://localhost:8000/api/${endpoint}`);
            if (!response.ok) throw new Error('Error fetching data');
            const result = await response.json();
            setData(result);
            setDataType(type);
        } catch (error) {
            console.error(error);
        }
    };

    const handleButtonClick = (type: string) => {
        if (type === 'parts') {
            fetchData('getallparts', 'parts');
        } else if (type === 'warehouses') {
            fetchData('getallwarehouses', 'warehouses');
        }
    };

    return (
        <div className={styles.app}>
            <Navbar onButtonClick={handleButtonClick} />
            <MainContent data={data} dataType={dataType} fetchData={fetchData} />
        </div>
    );
};

export default App;
