import React from "react"

function Home({ currentUser, tickets }) {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
      </tr>
    )
  })

  return (
    <div className="container">
      {currentUser ? (
        <h5>Welcome {currentUser.email} You are now signed in</h5>
      ) : (
        <h3>Welcome Guest. Please Sign in to continue</h3>
      )}
      <br />
      <br />
      <h1>Your Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  )
}

Home.getInitialProps = async (client) => {
  const { data } = await client.get("/api/tickets")

  return { tickets: data }
}

export default Home
