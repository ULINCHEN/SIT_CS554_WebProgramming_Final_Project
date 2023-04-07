import chatRoute from './chatRoute.js';


const constructorMethod = (app) => {

    app.use('/chat', chatRoute);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

export default constructorMethod;