import {useAppSelector, useAppDispatch} from "../store/myHook.ts";
import {closeModal} from "../store/Reducers/modalReducer.ts";
import CreateModal from "./CreateModal.tsx";
import ChangeModal from "./ChangeModal.tsx";

const MyModal = () => {
    const modal = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()
    const darkTheme = document.documentElement.className === 'dark' || document.documentElement.className === 'dark'

    return ((modal.changeModal || modal.createModal) &&
        (<div className={`flex justify-center items-center absolute inset-0 bg-text ${darkTheme ? 'darkmodal' : 'modal'} z-50`}
            onClick={() => dispatch(closeModal())}
        >
            <div className="relative bg-second w-[50vw] px-20 py-10 rounded-2xl" onClick={(e) => e.stopPropagation()}>
                {modal.createModal && <CreateModal status={modal.status}/>}
                {modal.changeModal && <ChangeModal/>}
            </div>
        </div>)
    );
};

export default MyModal;