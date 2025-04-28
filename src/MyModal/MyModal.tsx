import { useState } from 'react';
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
                    className="relative bg-second rounded-3xl w-[80vw] lg:w-[50vw] px-5 sm:px-10 md:px-20 py-5 sm:py-10"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                >
                    {(modal.openedModal === "create") && <CreateModal status={modal.status} errors={errors} setErrors={setErrors}/>}
                    {(modal.openedModal === "change") && <ChangeModal errors={errors} setErrors={setErrors} />}
                    {(modal.openedModal === "clear" || modal.openedModal === "statistics") && <AcceptDeleteModal accept={modal.openedModal}/>}
                </div>
            </div>
        )
    );
};

export default MyModal;