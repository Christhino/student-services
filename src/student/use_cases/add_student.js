const Student = require('../model');
const amqp = require('amqplib');

module.exports = (repository, authService) => {
  async function execute(
    firstname,
    lastname,
    email,
    age,
    address,
    city,
    region,
    postalCode,
    motherNames,
    fatherNames,
    authToken
  ) {
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
      if (!authResult.authenticated || authResult.role !== 'admin') {
        throw new Error('Unauthorized');
      }


      if (!(firstname && lastname && email)) {
        throw new Error('Validation failed');
      }

      const existingStudent = await repository.getByEmail(email);
      if (existingStudent) {
        throw new Error('Email already exists');
      }

      const newStudent = new Student(
        firstname,
        lastname,
        email,
        age,
        address,
        city,
        region,
        postalCode,
        motherNames,
        fatherNames
      );

      // Enregistrement de l'étudiant
      const createdStudent = await repository.create(newStudent);
      return createdStudent;
    } catch (error) {
      throw error;
    }
  }

  return { execute };
};
