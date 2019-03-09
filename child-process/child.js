process.send('Child start!');

process.on('message', message => {
  console.log(`message from parent: ${message}`);

  process.send('Child done!');

  process.disconnect();
});