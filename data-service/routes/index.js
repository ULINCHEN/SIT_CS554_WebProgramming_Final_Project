import chatRoute from './chatRoute.js';
import pets from './pets.js';
import landing from './landing.js';


const constructorMethod = (app) => {
    app.use('/', landing);

    app.use('/pets', pets);

    app.use('/chat', chatRoute);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

export default constructorMethod;