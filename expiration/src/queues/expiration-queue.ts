import Queue from "bull"

interface Payload {
  orderId: string
}


const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
})

//process job
expirationQueue.process(async (job) => {
  console.log("publish expiration:complete event for orderId", job.data.orderId)
})

export { expirationQueue }
