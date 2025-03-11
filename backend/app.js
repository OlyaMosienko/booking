require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const { register, login, getUsers } = require('./controllers/user');
const { getRooms, getRoom, editRoom } = require('./controllers/room');
const { addReview, deleteReview } = require('./controllers/reviews');
const authenticated = require('./middlewares/authenticated');
const hasRole = require('./middlewares/hasRole');
const ROLES = require('./constants/roles');
const mapUser = require('./helpers/mapUser');
const mapRoom = require('./helpers/mapRoom');
const mapReview = require('./helpers/mapReview');
const {
    getFavorites,
    addFavorite,
    toggleFavorite,
} = require('./controllers/favorite');
const mapFavorite = require('./helpers/mapFavorite');
const {
    getUserBookings,
    addBooking,
    removeBooking,
    getAllBookings,
} = require('./controllers/booking');
const mapBooking = require('./helpers/mapBooking');

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.post('/register', async (req, res) => {
    try {
        const { user, token } = await register(
            req.body.login,
            req.body.password
        );
        res.cookie('token', token, { httpOnly: true }).send({
            error: null,
            user: mapUser(user),
        });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { user, token } = await login(req.body.login, req.body.password);

        res.cookie('token', token, { httpOnly: true }).send({
            error: null,
            user: mapUser(user),
        });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

app.use(authenticated);

app.post('/rooms/:id/reviews', async (req, res) => {
    const newReview = await addReview(req.params.id, {
        content: req.body.content,
        author: req.user.id,
    });

    res.send({ data: mapReview(newReview) });
});
app.delete(
    '/rooms/:roomId/reviews/:reviewId',
    hasRole([ROLES.ADMIN, ROLES.RESIDENT]),
    async (req, res) => {
        await deleteReview(req.params.roomId, req.params.reviewId);

        res.send({ error: null });
    }
);

app.get('/rooms', async (req, res) => {
    const { rooms, lastPage } = await getRooms(
        req.query.dateRange,
        req.query.roomType,
        req.query.guests,
        req.query.priceRange,
        req.query.limit,
        req.query.page
    );

    res.send({ data: { lastPage, rooms: rooms.map(mapRoom) } });
});
app.get('/rooms/:id', async (req, res) => {
    const room = await getRoom(req.params.id);

    res.send({ data: mapRoom(room) });
});
app.patch('/rooms/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    const room = await editRoom(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    });

    res.send({ data: mapRoom(room) });
});

app.get('/favorites', async (req, res) => {
    const favorites = await getFavorites(req.user.id);

    res.send({ data: favorites.map(mapFavorite) });
});
app.post('/favorites', async (req, res) => {
    const result = await toggleFavorite(req.user.id, req.body.roomId);

    res.send({ data: result });
});

app.get('/bookings', async (req, res) => {
    const bookings = await getUserBookings(req.user.id);

    res.send({ data: bookings.map(mapBooking) });
});
app.post('/bookings', async (req, res) => {
    const newBooking = await addBooking(req.user.id, req.body);

    res.send({ data: mapBooking(newBooking) });
});
app.delete('/bookings/:id', async (req, res) => {
    const result = await removeBooking(req.user.id, req.params.id);

    res.send(result);
});
app.get('/bookings/all', async (req, res) => {
    const bookings = await getAllBookings();

    res.send({ data: bookings.map(mapBooking) });
});

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
    const users = await getUsers();

    res.send({ data: users.map(mapUser) });
});

app.post('/logout', async (req, res) => {
    res.cookie('token', '', { httpOnly: true }).send({});
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});
