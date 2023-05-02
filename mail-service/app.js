import amqp from 'amqplib';
import nodemailer from 'nodemailer';

const QUEUE_NAME = 'my-queue';


const connection = await amqp.connect('amqp://rabbitmqhost');

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
    from: 'Pet Match',
    to: user2.email,
    subject: `Congratulations! your pet has been matched with the user ${user1.name}`,
    html: `<h1 style="color: purple;">Great, your pet and the ${user1.name}'s pet both like each other </h1>
            <p style="font-size: 16px;">An new online chat room has been set up for you. Go check it out!</p>
            <p style="font-size: 12px;">Best Regards!</p>
            <p style="font-size: 12px;">CS554_A_TBD</p>
            `
            
  };

  const mailOptions2 = {
    from: 'Pet Match',
    to: user1.email,
    subject: `Congratulations! your pet has been matched with the user ${user2.name}`,
    html: `<h1 style="color: purple;">Great, your pet and the ${user1.name}'s pet both like each other </h1>
            <p style="font-size: 16px;">An new online chat room has been set up for you. Go check it out!</p>
            <p style="font-size: 12px;">Best Regards!</p>
            <p style="font-size: 12px;">CS554_A_TBD</p>
            `
    
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
