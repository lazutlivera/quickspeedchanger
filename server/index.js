const express = require('express');
const cors = require('cors');
const audioRoutes = require('./routes/audioRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/audio', audioRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
