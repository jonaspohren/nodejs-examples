const { fork } = require('child_process');

const child = fork('child.js');

child.on('message', message => {
  console.log(`message from child: ${message}`);
});

child.on('disconnect', () => {
  console.log('Child disconnected');
});

child.on('exit', (code) => {
  console.log(`Child finished with code: ${code}`);
});

child.send('Hello World!');