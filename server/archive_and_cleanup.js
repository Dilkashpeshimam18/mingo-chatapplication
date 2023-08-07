const cron = require('node-cron');
const sequelize = require('./utils/db');
const AllMessage = require('./models/message'); 
const ArchivedMessage = require('./models/archiveMessage'); 

cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = new Date();
    const oneDayAgo = new Date(currentDate);
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const oldMessages = await AllMessage.findAll({
      where: {
        createdAt: {
          [sequelize.Op.lte]: oneDayAgo,
        },
      },
    });

    await ArchivedMessage.bulkCreate(oldMessages.map((message) => message.toJSON()));

    await AllMessage.destroy({
      where: {
        createdAt: {
          [sequelize.Op.lte]: oneDayAgo,
        },
      },
    });

    console.log('Archiving and cleanup completed successfully.');
  } catch (error) {
    console.error('Error occurred during archiving and cleanup:', error);
  }
});

console.log('Cron job scheduled.');
