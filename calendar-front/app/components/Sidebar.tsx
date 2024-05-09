import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import DayInformation from './DayInformation';
import { CiCirclePlus } from "react-icons/ci";
import Modal from './Modal';

interface SidebarProps  {
    isOpen: boolean;
    onClose: () => void;
    selectedDay: Date | null;
    children?: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, selectedDay, children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <CSSTransition in={isOpen} timeout={300} classNames="sidebar" unmountOnExit>
            <div className="fixed inset-0 flex items-center justify-center z-50 sidebar-overlay" onClick={handleBackgroundClick}>
                <div className="relative sidebar bg-white p-6 rounded shadow-lg w-3/4 h-full overflow-auto sidebar-bg">
                    <button onClick={onClose}>Close Sidebar </button>
                    <DayInformation selectedDay={selectedDay} />
                    {children}
                    <button className="absolute bottom-0 right-0 mb-4 mr-4 " title="Add Event" onClick={() => setIsModalOpen(true)}>
                        <CiCirclePlus />
                    </button>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    </Modal>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Sidebar;