import React, {useState, useEffect} from 'react';
import styles from './AddPartModal.module.css';

interface AddPartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (part: { id: number; model: string; brand: string; price: number }, warehouseId: number) => void;
  defaultId: number;
}

const AddPartModal: React.FC<AddPartModalProps> = ({ isOpen, onClose, onSave, defaultId }) => {
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [warehouseId, setWarehouseId] = useState<number | null>(null);

  useEffect(() => {
    setWarehouseId(null);
  }, [isOpen]);

  const handleSubmit = () => {
    if (warehouseId != null) {
      onSave({id: defaultId, model, brand, price}, warehouseId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add Part</h2>
        <div className={styles.modalContent}>
          <label className={styles.label}>Model:
            <input className={styles.input} type="text" value={model} onChange={(e) => setModel(e.target.value)}/>
          </label>
          <label className={styles.label}>Brand:
            <input className={styles.input} type="text" value={brand} onChange={(e) => setBrand(e.target.value)}/>
          </label>
          <label className={styles.label}>Price:
            <input className={styles.input} type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
          </label>
          <label className={styles.label}>Warehouse ID:
            <input className={styles.input} type="number" value={warehouseId || ''} onChange={(e) => setWarehouseId(Number(e.target.value))}/>
          </label>
        </div>
        <div className={styles.modalButtons}>
          <button className={styles.saveButton} onClick={handleSubmit}>Save</button>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddPartModal;