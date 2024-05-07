import React from 'react';
import { CSSTransition } from 'react-transition-group';
import DayInformation from './DayInformation';

interface ModalProps  {
    isOpen: boolean;
    onClose: () => void;
    selectedDay: Date | null;
    children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedDay, children }) => {
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
            <div className="fixed inset-0 flex items-center justify-center z-50 modal-overlay" onClick={handleBackgroundClick}>
                <div className="modal bg-white p-6 rounded shadow-lg w-3/4 h-3/4 overflow-auto modal-bg">
                    <button onClick={onClose}>Close Modal</button>
                    <DayInformation selectedDay={selectedDay} />
                    {children}
                </div>
            </div>
        </CSSTransition>
    );
};

export default Modal;