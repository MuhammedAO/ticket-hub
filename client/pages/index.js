import React from "react"
import axios from "axios"

function Home({ currentUser }) {
  console.log(currentUser)
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  console.log(req)
  const { data } = await axios.get(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
    {
      headers: {
        Host: "ticketing.dev",
        cookie: req.headers.cookie,
      },
    }
  )
  return {
    props: {
      currentUser: data.currentUser,
    },
  }
}

export default Home
