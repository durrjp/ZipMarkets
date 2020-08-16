import React, { useContext, useState, createContext } from "react"
import { UserContext } from "./UserProvider"

export const MortgageRateContext = createContext()

export default function MortgageRateProvider(props) {
    const {getToken} = useContext(UserContext)
    const [mortgageRates, setMortgageRates] = useState([])


    const getMortgageRates = () => (
        getToken().then((token) => 
        fetch("/api/mortgagerate", {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
        }).then((res) => res.json())
          .then((res) => {
            setMortgageRates(res)
          }))
      )

    return (
        <MortgageRateContext.Provider value={{getMortgageRates, mortgageRates}}>
            {props.children}
        </MortgageRateContext.Provider>
    )
}