const cluster = require('cluster');
const os = require('os');

cluster.setupMaster({
    exec: 'server.js'
});

cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
});

for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
}
