const amqp = require('amqplib')

class RabbitMQ {

    connect = async () => {
        /** @type {amqp.Connection} */
        this.connection = await amqp.connect('amqp://localhost:5672')

        /** @type {amqp.Channel} */
        this.channel = await this.connection.createChannel()
    }
   
    publish = async (queue, payload) => {
        this.channel.sendToQueue(queue, Buffer.from(payload))
        console.log(" [x] Sent %s", queue);
    }
}

/** @type {RabbitMQ} */
let instance = null

RabbitMQ.getInstance = async () => {
    if (!instance) {
        instance = new RabbitMQ()
        await instance.connect()
        return instance
    }
    return instance
}

module.exports = RabbitMQ