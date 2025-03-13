import { createRoot } from 'react-dom/client';
import { AppProviders } from './app/providers';
import { App } from './app/App';

createRoot(document.getElementById('root')).render(
	<AppProviders>
		<App />
	</AppProviders>,
);
