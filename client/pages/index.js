import React from "react"
import axios from "axios"

function Home({ currentUser }) {
  return (
    <div className="container">
    { currentUser ?  <h5>Welcome {currentUser.email} You are now signed in</h5> : <h3>Welcome Guest. Please Sign in to continue</h3>}
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { data } = await axios.get(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
    {
      headers: req.headers
    }
  )
  return {
    props: {
      currentUser: data.currentUser,
    },
  }
}


export default Home
