import React, { useContext, createContext } from "react"
import { UserContext } from "./UserProvider";

export const PinnedMarketContext = createContext();

export default function PinnedMarketProvider(props) {
    const { getToken } = useContext(UserContext);
    const apiUrl = "/api/pinnedmarket/";

    const addPinnedMarket = (pm) => {
        return getToken().then((token) =>
          fetch(apiUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pm),
          }).then((resp) => {
            if (resp.ok) {
              return resp.json();
            }
            throw new Error("Unauthorized");
          })
        );
      };
  
      const deletePinnedMarket = (id) => {
        return getToken().then((token) =>
          fetch(apiUrl + `${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        );
      };

    return (
        <PinnedMarketContext.Provider
            value={{
                addPinnedMarket,
                deletePinnedMarket
            }}
            >
            {props.children}
        </PinnedMarketContext.Provider>
    )
}