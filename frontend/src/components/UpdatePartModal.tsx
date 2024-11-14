import React, {useState} from 'react';
import styles from './PartModal.module.css';

interface UpdatePartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (part: { model: string; brand: string; price: number, warehouseId: number }, partId: number) => void;
}

const UpdatePartModal: React.FC<UpdatePartModalProps> = ({ isOpen, onClose, onSave }) => {
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [warehouseId, setWarehouseId] = useState(0);
  const [partId, setPartId] = useState(0);

  const handleSubmit = () => {
    if (partId != null) {
      onSave({model, brand, price, warehouseId}, partId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Update Part</h2>
        <div className={styles.modalContent}>
          <label className={styles.label}>Part ID:
            <input className={styles.input} type="number" value={partId} onChange={(e) => setPartId(Number(e.target.value))}/>
          </label>
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
            <input className={styles.input} type="number" value={warehouseId} onChange={(e) => setWarehouseId(Number(e.target.value))}/>
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

export default UpdatePartModal;