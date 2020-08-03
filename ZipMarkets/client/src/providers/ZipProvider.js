import React, { createContext, useState, useContext } from "react";
import { UserContext } from "./UserProvider";

export const ZipContext = createContext()

export default function ZipProvider(props) {
    const [allZips, setAllZips] = useState([])
    const {getToken} = useContext(UserContext)
    const [avgHPIs, setAvgHPIs] = useState([])
    const [avgZVHIs, setAvgZVHIs] = useState([])

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
    
    const getAvgHPIs = () => (
      getToken().then((token) => 
      fetch("/api/zip/getavghpi", {
        method: "GET",
        headers: {
          Authorization:  `Bearer ${token}`
        }
      }).then((res) => res.json())
        .then(setAvgHPIs))
    )

    const getAvgZVHIs = () => (
      getToken().then((token) => 
      fetch("/api/zip/getavgzvhi", {
        method: "GET",
        headers: {
          Authorization:  `Bearer ${token}`
        }
      }).then((res) => res.json())
        .then(setAvgZVHIs))
    )


    return (
        <ZipContext.Provider value={{getAllZips, allZips, getZipById, getZipByZipCode, getAvgHPIs, avgHPIs, getAvgZVHIs, avgZVHIs}}>
            {props.children}
        </ZipContext.Provider>
        );
}