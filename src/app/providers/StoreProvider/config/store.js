import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { appReducer } from '@/entities/app/model';
import { userReducer } from '@/entities/user/model';
import { roomReducer } from '@/entities/room/model';
import { favoritesReducer } from '@/entities/favorites/model';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	room: roomReducer,
	favorites: favoritesReducer,
	bookings: '',
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
