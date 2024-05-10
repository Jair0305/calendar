import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Form from "@/app/components/Form";

interface ModalProps  {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose}) => {
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
            <div className="fixed inset-0 flex items-center justify-center z-50 modal-overlay" onClick={handleBackgroundClick}>
                <div className="relative modal bg-white p-6 rounded shadow-lg w-3/4 h-3/4 overflow-auto modal-bg">
                    <div className="flex w-full">
                        <div className=" w-full sticky top-0 h-full flex flex-col">
                            <button className="-left-4 absolute -top-4" onClick={onClose}>X</button>
                            hola
                        </div>
                        <Form />
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Modal;