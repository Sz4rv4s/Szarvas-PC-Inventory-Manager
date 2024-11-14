import React, {useState} from 'react';
import styles from './DeletePartModal.module.css';

interface DeletePartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (partId: number) => void;
}

const DeletePartModal: React.FC<DeletePartModalProps> = ({ isOpen, onClose, onSave }) => {
  const [partId, setPartId] = useState(0);

  const handleSubmit = () => {
    if (partId != 0) {
      onSave(partId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Delete Part</h2>
        <div className={styles.modalContent}>
          <label className={styles.label}>ID:
            <input className={styles.input} type="number" value={partId} onChange={(e) => {
              setPartId(Number(e.target.value));
            }}/>
          </label>
        </div>
        <div className={styles.modalButtons}>
          <button className={styles.cancelButton} onClick={handleSubmit}>Delete</button>
          <button className={styles.saveButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePartModal;