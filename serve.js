import express from 'express';
import cluster from 'cluster';
import os from 'os';

// check if we are in master node 
if (cluster.isPrimary) {
    const cores = os.cpus();
    console.log(`Forking for ${cores.length} CPUs`);
    // forEach is safer to prevent fork bomb
    cores.forEach(() =>{
        cluster.fork();
    });
    
} else {
    // prevent the core from crashing
    process.on('uncaughtException', (error, origin) => {
        console.log('----- Uncaught exception -----')
        console.log(error)
        console.log('----- Exception origin -----')
        console.log(origin)
        console.log('server is listening on at http://localhost:5000');
    })
      
    process.on('unhandledRejection', (reason, promise) => {
        console.log('----- Unhandled Rejection at -----')
        console.log(promise)
        console.log('----- Reason -----')
        console.log(reason)
        console.log('server is listening on at http://localhost:5000');
    })
    const app = express();
    const port = 8080;
    const pid = process.pid;
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.listen(port, () =>{
        console.log(`Process${pid} is listenining on http://localhost:${port}`);
    });

}
