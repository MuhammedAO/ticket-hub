const OrderIndex = ({ orders }) => {
  return (
    <div className="container">
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id}>
             Your order with the title of {order.ticket.title} was {order.status}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders")

  return { orders: data }
}

export default OrderIndex
