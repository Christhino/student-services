const Student = require('../model');
const amqp = require('amqplib');

module.exports = (repository, authService) => {
  async function execute(authToken) {
    try {

      const authRequest = {
        email,
        authToken,
      };
      const MESSAGE_BROKER_URL = 'amqp://rabbitmq:rabbitmq@localhost:5672/'
      const connection = await amqp.connect(MESSAGE_BROKER_URL);
      const channel = await connection.createChannel();
      const queue = 'authentication_queue';

      await channel.assertQueue(queue);
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(authRequest)));


      const authResult = await authService.verifyToken(authToken);
      if (!authResult.authenticated) {
        throw new Error('Unauthorized');
      }
      const students = await repository.getAll();
      return students;
    } catch (error) {
      throw error;
    }
  }

  return { execute };
};
