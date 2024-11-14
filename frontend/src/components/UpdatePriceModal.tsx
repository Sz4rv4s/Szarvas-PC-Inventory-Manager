import React, {useState} from 'react';
import styles from './PartModal.module.css';

interface UpdatePriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (partId: number, price: number) => void;
}

const UpdatePriceModal: React.FC<UpdatePriceModalProps> = ({ isOpen, onClose, onSave }) => {
  const [partId, setPartId] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = () => {
    if (partId != null) {
      onSave(partId, price);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Update Price</h2>
        <div className={styles.modalContent}>
          <label className={styles.label}>Part ID:
            <input className={styles.input} type="number" value={partId} onChange={(e) => setPartId(Number(e.target.value))}/>
          </label>
          <label className={styles.label}>New Price:
            <input className={styles.input} type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
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

export default UpdatePriceModal;