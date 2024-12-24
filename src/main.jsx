import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { ModalProvider } from './app/providers/ModalProvider';
import { App } from './app/App';

createRoot(document.getElementById('root')).render(
	<StoreProvider>
		<BrowserRouter>
			<ThemeProvider>
				<ModalProvider>
					<App />
				</ModalProvider>
			</ThemeProvider>
		</BrowserRouter>
	</StoreProvider>,
);
