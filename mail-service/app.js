import amqp from 'amqplib';
import nodemailer from 'nodemailer';

const QUEUE_NAME = 'my-queue';

const connection = await amqp.connect('amqp://localhost');
const channel = await connection.createChannel();

await channel.assertQueue(QUEUE_NAME, { durable: false });
await channel.prefetch(1);

console.log(`Waiting for messages in ${QUEUE_NAME}. To exit, press CTRL+C`);

channel.consume(QUEUE_NAME, async (msg) => {
  
  const obj = JSON.parse(msg.content)
  const { user1, user2 } = obj
  console.log(user1)
  console.log(user2)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '554finallab@gmail.com',
        pass: 'aovasuvdcrnfojrq'
    }
  });

  const mailOptions1 = {
    from: '554finallab@gmail.com',
    to: user2.email,
    subject: 'You match with',
    text: `Nice, ${user1.name} mathch with you`
  };

  const mailOptions2 = {
    from: '554finallab@gmail.com',
    to: user1.email,
    subject: `You match with ${user2.name}`,
    text: `Nice, ${user2.name} mathch with you`
  };

  try {
    await transporter.sendMail(mailOptions1);
    console.log(`Email sent to ${user2.email}`);
    await transporter.sendMail(mailOptions2);
    console.log(`Email sent to ${user1.email}`);
    channel.ack(msg);
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
    channel.nack(msg);
  }
}, { noAck: false });
