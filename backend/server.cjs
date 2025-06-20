const fastify = require('fastify')({ logger: true })
const fastifyStatic = require('@fastify/static')
const fastifyWebSocket = require('@fastify/websocket')
const mqtt = require('mqtt')
const path = require('node:path')

const port = 3000
const MQTT_URL = 'mqtt://localhost:1883'


fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  wildcard: true,
  index: ['index.html'],
  extensions: ['html']
})

fastify.register(fastifyWebSocket)


const mqttClient = mqtt.connect(MQTT_URL)

mqttClient.on('connect', () => {
    fastify.log.info('[MQTT] Connected')
    mqttClient.subscribe('winefridge/system/status')
});

mqttClient.on('message', (topic, message) => {
    const msg = message.toString();
    fastify.websocketServer.clients.forEach((client) => {
        if (client.readyState === 1) { // WebSocket.OPEN
            client.send(msg);
        }
    });
});

fastify.register(async function (fastify) {
    fastify.get('/ws', { websocket: true }, (connection, req) => {
        fastify.log.info('[WebSocket] Web client connected');

        connection.socket.on('message', (data) => {
            try {
                const message = JSON.parse(data.toString());
                mqttClient.publish('winefridge/system/command', JSON.stringify(message));
            } catch (err) {
                fastify.log.error('[WebSocket] Invalid JSON:', err);
            }
        });
    });
});

const start = async () => {
  try {
    await fastify.listen({ port })
    fastify.log.info(`Server running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
