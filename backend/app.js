const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { register, login, getUsers } = require('./controllers/user');
const mapUser = require('./helpers/mapUser');
const authenticated = require('./middlewares/authenticated');
const hasRole = require('./middlewares/hasRole');
const ROLES = require('./constants/roles');
const { getRooms, getRoom, addRoom } = require('./controllers/room');
const path = require('path');
const mapRoom = require('./helpers/mapRoom');

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

app.get('/rooms', async (req, res) => {
    console.log(req.query);

    const { rooms, lastPage } = await getRooms(
        req.query.dateRange,
        req.query.roomType,
        req.query.guests,
        req.query.priceRange,
        req.query.limit,
        req.query.page
    );
    console.log(rooms);

    res.send({ data: { lastPage, rooms: rooms.map(mapRoom) } });
});
app.get('/rooms/:id', async (req, res) => {
    const room = await getRoom(req.params.id);

    res.send({ data: mapRoom(room) });
});

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
    const users = await getUsers();

    res.send({ data: users.map(mapUser) });
});

app.post('/logout', async (req, res) => {
    res.cookie('token', '', { httpOnly: true }).send({});
});

mongoose
    .connect(
        'mongodb+srv://dbUser:dbUser123@cluster0.lombc.mongodb.net/bookings?retryWrites=true&w=majority&appName=Cluster0'
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    });
