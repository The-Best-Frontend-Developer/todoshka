import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/myHook.ts';
import { closeModal } from '../store/Reducers/modalReducer.ts';
import CreateModal from './CreateModal.tsx';
import ChangeModal from './ChangeModal.tsx';
import AcceptDeleteModal from './AcceptDeleteModal.tsx';

const MyModal = () => {
    const modal = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
    const darkTheme = document.documentElement.className === 'dark';
    const [errors, setErrors] = useState<string | null>(null);

    return (
        modal.openedModal && (
            <div
                className={`flex z-50 justify-center items-center fixed inset-0 bg-text ${darkTheme ? 'darkmodal' : 'modal'}`}
                onClick={() => dispatch(closeModal())}
            >
                <div
                    className="relative bg-second rounded-2xl w-[80vw] lg:w-[50vw] px-5 sm:px-10 md:px-20 py-5 sm:py-10"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                >
                    <button type="button" className="absolute right-1 top-1 stroke-red-500 hover:stroke-red-400"
                            onClick={() => {dispatch(closeModal()); setErrors(null)}}
                    >
                        <svg width="35" height="35" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="4"
                                y="4"
                                width="40"
                                height="40"
                                rx="10"
                                strokeWidth="1"
                                fill="none"
                            />
                            <line x1="16" y1="16" x2="32" y2="32" strokeWidth="1"/>
                            <line x1="32" y1="16" x2="16" y2="32" strokeWidth="1"/>
                        </svg>
                    </button>
                    {(modal.openedModal === "create") && <CreateModal status={modal.status} errors={errors} setErrors={setErrors}/>}
                    {(modal.openedModal === "change") && <ChangeModal errors={errors} setErrors={setErrors} />}
                    {(modal.openedModal === "clear" || modal.openedModal === "statistics") && <AcceptDeleteModal accept={modal.openedModal}/>}
                </div>
            </div>
        )
    );
};

export default MyModal;