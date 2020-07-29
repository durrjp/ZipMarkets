import React, { createContext, useState, useContext } from "react";
import { UserContext } from "./UserProvider";

export const ZipContext = createContext()

export default function ZipProvider(props) {
    const [allZips, setAllZips] = useState([])
    const {getToken} = useContext(UserContext)

    const getAllZips = () => (
        getToken().then((token) => 
        fetch("/api/zip", {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
        }).then((res) => res.json())
          .then(setAllZips))
    )

    return (
        <ZipContext.Provider value={{getAllZips, allZips }}>
            {props.children}
        </ZipContext.Provider>
        );
}