const express = require('express');
const app = require('express')();
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
  console.log('index touched');
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(3000, () => { console.log('Server started at port 3000'); });
