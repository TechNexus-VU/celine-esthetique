const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Celine AI Endpoints
app.use('/api/ai', aiRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server live on port ${PORT}`));