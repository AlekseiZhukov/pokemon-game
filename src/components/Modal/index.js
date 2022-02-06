import React, {useEffect, useRef} from 'react';
import cn from 'classnames';
import s from './style.module.css';

const Modal = ({isOpen, title, children, onCloseModal}) => {

    const modalEl = useRef()

    const handleCloseModal = () => {
        onCloseModal && onCloseModal(false)
    }

    const handleClickRoot = (event) => {
        if (!modalEl.current.contains(event.target)) {
            onCloseModal(false)
        }
    }

    useEffect(() => {
        document.querySelector('body').style.overflow = isOpen ? 'hidden' : null

    }, [isOpen])


    return (
        <div
            className={cn(s.root, {[s.open]: isOpen})}
            onClick={handleClickRoot}
        >
            <div className={s.modal}>
                <div ref={modalEl}>
                    <div className={s.head} >
                        {title}
                        <span
                            className={s.btnClose}
                            onClick={handleCloseModal}
                        />
                    </div>
                    <div className={s.content}>
                        {children}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Modal;