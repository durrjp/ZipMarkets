import React, { createContext, useState, useContext } from "react";
import { UserContext } from "./UserProvider";

export const ZipContext = createContext()

export default function ZipProvider(props) {
    const [allZips, setAllZips] = useState([])
    const {getToken} = useContext(UserContext)
    const [zipReady, setZipReady] = useState(false)
    
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

    const getZipById = (id) => (
      getToken().then((token) => 
      fetch(`/api/zip/${id}`, {
        method: "GET",
        headers: {
          Authorization:  `Bearer ${token}`
        }
      }).then((res) => res.json()))
    )

    const getZipByZipCode = (zipCode) => (
      getToken().then((token) => 
      fetch(`/api/zip/getbyzip/${zipCode}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()))
    )

    return (
        <ZipContext.Provider value={{getAllZips, allZips, getZipById, getZipByZipCode, zipReady, setZipReady}}>
            {props.children}
        </ZipContext.Provider>
        );
}