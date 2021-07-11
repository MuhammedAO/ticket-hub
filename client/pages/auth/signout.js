import React, { useEffect, useState } from "react"
import Router from "next/router"
import axios from 'axios'

function SignOut() {

  const OnSignOut = async () => {
    try {
      const response = await axios.post("/api/users/signout", {})
      Router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    OnSignOut()
  }, [])
  return (
    <div>
      <h1>Signing out...</h1>
    </div>
  )
}



export default SignOut
