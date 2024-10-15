const express = require('express');
const path = require('path');
const app = express();

app.use('/visioncubed', express.static(path.join(__dirname, 'build')));

app.get('/visioncubed/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
