//Nodejs server
console.log("Server Start !!!");
var mongo = require('mongodb').MongoClient,
    client = require('socket.io').listen(9000).sockets;

mongo.connect('mongodb://127.0.0.1/chat',function (err,db) {
    if (err) throw err;

    client.on('connection',function (socket) {
        //use the table named message from db
        var col = db.collection("message");
        var sendStatus = (s) => {
            socket.emit('status',s);
        };

        //Emit all messages

        col.find().limit(100).sort({_id: 1}).toArray((err,res) => {
            if(err) throw err;

            socket.emit('output',res);
        });
        
        //Wait for input

        socket.on('input',function (data) {
            var name = data.name.trim();
            var message = data.message.trim();
            if (name && message) {
                col.insert({name: name, message : message}, function () {
                    //Emit latest message to all clients
                    client.emit('output',[data]);

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


