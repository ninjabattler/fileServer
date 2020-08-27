console.clear();

const net = require('net');

const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Welcome, please enter the IP address you would like to connect to\n", (IP)=>{

  rl.question("\nExcellent, now please enter the port\n", (PORT)=>{

    rl.question("\nAlmost there, please enter the file you wish to receive\n", (FILE)=>{
      
      console.log("\nSending request, please be patient\n")
      connect(IP, PORT, FILE);

      rl.close();

    })

  })

})

const connect = (IP, PORT, FILE) =>{

  const conn = net.createConnection({ 
    host: IP.toString(), // change to IP address of computer or ngrok host if tunneling
    port: Number(PORT) // or change to the ngrok port if tunneling
  });
  
  conn.setEncoding('utf8'); // interpret data as text
  
  conn.on('data', (data) => {

    if(data.toString() === "ERROR"){

      console.log(`\nWe're sorry, we couldnt find the file you requested, please try again\n`);

    } else {

      fs.writeFile(FILE.toString(), data.toString(), (err) =>{
    
        console.log(`\nReceived ${FILE.toString()} from ${IP}:${PORT}\n`);
    
      })

    }

    conn.destroy();
  });
  
  conn.on('connect', () => {
    conn.write(FILE.toString());
  });

}