import { useCallback, useMemo, useState } from 'react';
import { ModalContext } from '../lib/ModalContext';

export const ModalProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState(null);

	const openModal = useCallback((content) => {
		setContent(content);
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => setIsOpen(false), []);

	const modalProps = useMemo(
		() => ({
			isOpen,
			openModal,
			closeModal,
			content,
		}),
		[closeModal, content, isOpen, openModal],
	);

	return <ModalContext.Provider value={modalProps}>{children}</ModalContext.Provider>;
};
