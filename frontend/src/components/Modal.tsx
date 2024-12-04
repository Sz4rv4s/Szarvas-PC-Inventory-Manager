import {FC} from 'react';
import {ModalProps} from "../types/types.ts";



const Modal: FC<ModalProps> = ({ message, onClose }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-primary flex justify-center align-center -z-50">
            <div className="bg-white p-6 rounded-b shadow-md text-center">
                {message && <p>{message}</p>}
                <button className="bg-cblue px-2 py-4 rounded-md shadow-md text-center hover:bg-cbluehover" onClick={onClose}>Okay</button>
            </div>
        </div>
    );
};

export default Modal;
