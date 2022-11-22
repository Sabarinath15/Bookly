const express = require('express');
const app = express();

const account = require('./routers/userRoute'); //router for accounts login and signup
const event =  require('./routers/eventRoute'); //router for events
const slots = require('./routers/slotRoute'); //slots router

//port
const port = 3000;

const start = async () => {
    try {
        app.listen(port, console.log(`Server is listening on ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();

app.use(express.static('./public'));
app.use(express.json());

//routers
app.use('/account', account);
app.use('/events',event);
app.use('/slots', slots);

