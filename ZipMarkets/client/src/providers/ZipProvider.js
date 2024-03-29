import React, { createContext, useState, useContext } from "react";
import { UserContext } from "./UserProvider";

export const ZipContext = createContext()

export default function ZipProvider(props) {
    const [allZips, setAllZips] = useState([])
    const [zipsByPrice, setZipsByPrice] = useState([])
    const {getToken} = useContext(UserContext)
    const [zipReady, setZipReady] = useState(false)
    const [twoZips, setTwoZips] = useState([])
    
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
      fetch(`/api/zip/getbyzip/${zipCode}`, {
        method: "GET"
      }).then((res) => res.json())
    )

    const getZipsByPrice = (priceString) => (
      getToken().then((token) => 
      fetch(`/api/zip/getbyprice/${priceString}`, {
        method: "GET",
        headers: {
          Authorization:  `Bearer ${token}`
        }
      }).then((res) => res.json())
        .then(setZipsByPrice))
    )

    const getTwoZips = (zipString) => (
      getToken().then((token) => 
      fetch(`/api/zip/comparison/${zipString}`, {
        method: "GET",
        headers: {
          Authorization:  `Bearer ${token}`
        }
      }).then((res) => res.json())
        .then(setTwoZips))
    )

    return (
        <ZipContext.Provider value={{getAllZips, allZips, getZipById, getZipByZipCode, zipReady, setZipReady, getZipsByPrice, zipsByPrice, twoZips, setTwoZips, getTwoZips}}>
            {props.children}
        </ZipContext.Provider>
        );
}