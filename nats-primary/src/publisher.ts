import nats from 'node-nats-streaming'

console.clear()

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('Publisher connected to NATS')

  const data = JSON.stringify({
    id:'jjk',
    title: 'Hello world',
    price:23
  })

  stan.publish('ticked:created', data, () => console.log('Event published'))

})