import { useCallback, useMemo, useState } from 'react';
import { ToastContext } from '../lib/ToastContext';

export const ToastProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [type, setType] = useState(null);

	const showToast = useCallback(
		({ message: initMessage, type: initType = null, time = 5000 }) => {
			setType(initType);
			setMessage(initMessage);
			setIsOpen(true);

			setTimeout(() => {
				setIsOpen(false);
			}, time);
		},
		[],
	);

	const closeToast = useCallback(() => setIsOpen(false), []);

	const toastProps = useMemo(
		() => ({
			isOpen,
			showToast,
			closeToast,
			message,
			type,
		}),
		[isOpen, showToast, closeToast, message, type],
	);

	return <ToastContext.Provider value={toastProps}>{children}</ToastContext.Provider>;
};
