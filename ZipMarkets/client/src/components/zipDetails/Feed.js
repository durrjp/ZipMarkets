import React, { useContext, useState } from "react"
import { MessageContext } from "../../providers/MessageProvider"
import { Input } from "reactstrap";

export default function Feed({oneZip}) {
    const {addMessage, deleteMessage} = useContext(MessageContext)
    const [content, setContent] = useState();
    const [categoryId, setCartegoryId] = useState()

    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    const saveMessage = () => {
        const newMessage = {
            zipCodeId: oneZip.id,
            categoryId,
            userId: currentUser.id,
            content
        }
        addMessage(newMessage)
    }

    const removeMessage = (id) => {
        deleteMessage(id)
    }
    return (
        <>
        <div>
            <Input
                
            >

            </Input>
        </div>
        </>
    )
}