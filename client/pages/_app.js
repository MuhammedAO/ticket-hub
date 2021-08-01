import React from "react"
import "../bootstrap.min.css"
import Header from "../components/Header"
import buildClient from "../components/build-client"

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <React.Fragment>
      <Header currentUser={currentUser} />
      <main className="py-3">
        <Component currentUser={currentUser} {...pageProps} />
      </main>
    </React.Fragment>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get("/api/users/currentuser")

  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client)
  }

  return {
    pageProps,
    ...data,
  }
}
export default MyApp
