const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

app.use(cors());

app.use(express.json());



app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contact'));

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => console.error('DB sync failed:', err));