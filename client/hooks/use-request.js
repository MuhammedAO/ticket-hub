import axios from "axios"
import { useState } from "react"
import Message from "../components/Message"

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null)

  const doRequest = async (props = {}) => {
    try {
      setErrors(null)
      const response = await axios[method](url, { ...body, ...props })

      if (onSuccess) {
        onSuccess(response.data)
      }

      return response.data
    } catch (err) {
      setErrors(
        <div className="container">
            {err.response.data.errors.map((err) => (
              <Message key={err.message} variant="danger">
                {err.message}
              </Message>
            ))}
        </div>
      )
    }
  }

  return { doRequest, errors }
}
