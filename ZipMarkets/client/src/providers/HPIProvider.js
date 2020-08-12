import React, { useContext, useState, createContext } from "react"
import { UserContext } from "./UserProvider"

export const HPIContext = createContext()

export default function HPiProvider(props) {
    const {getToken} = useContext(UserContext)
    const [avgHPIs, setAvgHPIs] = useState([])


    const getAvgHPIs = () => (
        getToken().then((token) => 
        fetch("/api/hpidata", {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
        }).then((res) => res.json())
        .then((res) => {
          setAvgHPIs(res)
        }))
      )

    return (
        <HPIContext.Provider value={{getAvgHPIs, avgHPIs}}>
            {props.children}
        </HPIContext.Provider>
    )
}