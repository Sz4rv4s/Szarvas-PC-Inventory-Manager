import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    message: string | null;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {message && <p>{message}</p>}
                <button className={styles.okButton} onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default Modal;