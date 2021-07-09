import React from "react"
import "../bootstrap.min.css"
import Header from "../components/Header"

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Header />
      <main className="py-3">
        <Component {...pageProps} />
      </main>
    </React.Fragment>
  )
}

export default MyApp
