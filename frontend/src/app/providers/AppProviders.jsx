import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { ModalProvider } from './ModalProvider';
import { ToastProvider } from './ToastProvider';

export const AppProviders = ({ children }) => {
	return (
		<StoreProvider>
			<BrowserRouter>
				<ThemeProvider>
					<ModalProvider>
						<ToastProvider>{children}</ToastProvider>
					</ModalProvider>
				</ThemeProvider>
			</BrowserRouter>
		</StoreProvider>
	);
};
