import React, { useContext, createContext } from "react"
import { UserContext } from "./UserProvider";

export const MessageContext = createContext();

export default function MessageProvider(props) {
    const { getToken } = useContext(UserContext);
    const apiUrl = "/api/messages/";

    const addMessage = (mess) => {
        return getToken().then((token) =>
          fetch(apiUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mess),
          })
        );
      };
  
      const deleteMessage = (id) => {
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
        <MessageContext.Provider
            value={{
                addMessage,
                deleteMessage
            }}
            >
            {props.children}
        </MessageContext.Provider>
    )
}