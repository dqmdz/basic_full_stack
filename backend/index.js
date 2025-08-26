import app from './src/app.js';
import sequelize from './src/database.js';
import Task from './src/models/Task.js';

async function startServer() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
    
    // Add some initial data
    await Task.create({ title: 'Learn React' });
    await Task.create({ title: 'Build a backend' });
    await Task.create({ title: 'Connect frontend to backend' });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
}

startServer();