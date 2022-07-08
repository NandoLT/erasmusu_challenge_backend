const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nandolt_37:6fpn3N1rinoqKMri@cluster0.ybj18j1.mongodb.net/?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.once('open', () => {
    console.log('Connected to mongodb at', mongoose.connection.name);
});

mongoose.connection.on('error', err => {
    console.log('Connection error: ', err);
    process.exit(1);
});


module.exports = mongoose.connection;
