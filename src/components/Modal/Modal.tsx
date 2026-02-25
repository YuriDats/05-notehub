import css from "./Modal.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handlerKey = (event: KeyboardEvent) => {
      if (event.code === "Escepe") onClose();
    };
    document.addEventListener("keydown", handlerKey);

    return () => {
      document.removeEventListener("keydown", handlerKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handlerBackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handlerBackClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
