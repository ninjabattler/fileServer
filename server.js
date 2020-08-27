console.clear();

const net = require('net');

const fs = require('fs');

const server = net.createServer();

server.on('connection', (client) => {
  console.log('New client connected!');

  client.setEncoding('utf8');

  client.on('data', (data) => {
    console.log(`Client has requested to download ${data.toString()}, locating...`);
    fs.readFile(data.toString() , (err, data2) =>{
      if(!err){
        console.log(`${data.toString()} found, sending...`);
        client.write(data2);
      }
      else {
        console.log(`file could not be found`);
        client.write("ERROR");
      }
    });

  });
});

server.listen(3000, () => {
  console.log('Server listening');
});

