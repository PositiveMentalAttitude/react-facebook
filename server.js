//Nodejs server
console.log("Server Start !!!");
var mongo = require('mongodb').MongoClient,
    client = require('socket.io').listen(9000).sockets;

mongo.connect('mongodb://127.0.0.1/chat',function (err,db) {
    if (err) throw err;

    client.on('connection',function (socket) {
        var col = db.collection("message");
        var sendStatus = (s) => {
            socket.emit('status',s);
        };
        
        //Wait for input

        socket.on('input',function (data) {
            var name = data.name.trim();
            var message = data.message.trim();
            if (name && message) {
                col.insert({name: name, message : message}, function () {
                    console.log("Inserted");
                    sendStatus({
                        message: "Message sent",
                        clear: true
                    });
                });
            } else {
                sendStatus("Name and message are required");
            }
        });
    });
});


