import React, { useContext, useState, createContext } from "react"
import { UserContext } from "./UserProvider"

export const ZVHIContext = createContext()

export default function ZVHIProvider(props) {
    const {getToken} = useContext(UserContext)
    const [avgZVHIs, setAvgZVHIs] = useState([])


    const getAvgZVHIs = () => (
        getToken().then((token) => 
        fetch("/api/zvhidata", {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
        }).then((res) => res.json())
          .then((res) => {
            setAvgZVHIs(res)
          }))
      )

    return (
        <ZVHIContext.Provider value={{getAvgZVHIs, avgZVHIs}}>
            {props.children}
        </ZVHIContext.Provider>
    )
}