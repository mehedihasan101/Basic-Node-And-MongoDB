const EventEmitter = require('events'); // <-- this line is required

const emitter = new EventEmitter(); 

// Register a listener for 'bellRing' event
emitter.on('bellRing', ({ period, text }) => {
    console.log(`We need to run because ${period} ${text}`); 
}); 

// Raise a 'bellRing' event with two parameters
emitter.emit('bellRing', {
    period: 'First',
    text: 'period ended',
});


