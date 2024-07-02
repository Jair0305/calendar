import React, { useState, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import Form from "@/app/components/Form";
import {SelectedPlaceContext} from "./SelectedPlaceContext";

interface ModalProps  {
    isOpen: boolean;
    onClose: () => void;
    selectedDay: Date | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedDay}) => {

    const context = useContext(SelectedPlaceContext)

    if(!context)
    {
        throw new Error("useSelectedPlace must be used within a SelectedPlaceProvider");
    }

    const {selectedPlace} = context

    const [selectedOption, setSelectedOption] = useState("selecciona una modalidad");

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    return (
        <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
            <div className="fixed inset-0 flex items-center justify-center z-50 modal-overlay" onClick={handleBackgroundClick}>
                <div className="relative modal bg-white p-6 rounded shadow-lg w-3/4 h-3/4 modal-bg overflow-hidden">
                    <button className="left-2 absolute top-2 font-bold" onClick={onClose}>X</button>
                    <Form selectedDay={selectedDay} onClose={onClose} selectedPlace={selectedPlace}/>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Modal;
