import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { ModalProvider } from './app/providers/ModalProvider';
import { App } from './app/App';
import { ToastProvider } from './app/providers/ToastProvider';

createRoot(document.getElementById('root')).render(
	<StoreProvider>
		<BrowserRouter>
			<ThemeProvider>
				<ModalProvider>
					<ToastProvider>
						<App />
					</ToastProvider>
				</ModalProvider>
			</ThemeProvider>
		</BrowserRouter>
	</StoreProvider>,
);
