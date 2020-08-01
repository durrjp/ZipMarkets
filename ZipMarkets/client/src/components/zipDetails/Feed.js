import React, { useContext, useState } from "react"
import { MessageContext } from "../../providers/MessageProvider"
import { Input, Button } from "reactstrap";

export default function Feed({oneZip}) {
    const {addMessage, deleteMessage} = useContext(MessageContext)
    const [content, setContent] = useState();
    const [categoryId, setCategoryId] = useState()

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
        <div className="messages-container">
            
        </div>
        <div className="messageSubmit-container">
            <Input
                type="text"
                id="newMessage"
                placeholder="Enter message here"
                onInput={(e) => setContent(e.target.value)}
            >
            </Input>
            <Button
                type="submit"
                size="md"
                onClick={(e) => {
                    e.preventDefault()
                    saveMessage()
                }}
            >
            Send
            </Button>
        </div>
        </>
    )
}