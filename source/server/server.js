const path = require('path');
const express = require('express');

const app = express();
const port = 9002;

const indexHtml = path.join(__dirname, '../index.html');

app.use(express.static(__dirname));
app.get('*', (req, res) => {
  res.sendFile(indexHtml);
});

app.listen(port, () => {
  console.log('\033c');
  console.log(`Server start on ${port} port...`);
});
