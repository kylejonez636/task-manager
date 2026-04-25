const express = require('express');
const cors = require('cors');
const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: CLIENT_URL
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Task Manager API.' });
});

require('./routes/task.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});