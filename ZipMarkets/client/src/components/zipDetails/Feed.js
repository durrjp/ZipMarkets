import React, { useContext, useState } from "react"
import { MessageContext } from "../../providers/MessageProvider"
import { Input, Button} from "reactstrap";
import "./Feed.css"

export default function Feed({oneZip, refreshZip}) {
    const {addMessage, deleteMessage} = useContext(MessageContext)
    const [content, setContent] = useState();
    const [categoryId, setCategoryId] = useState(3)

    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    const saveMessage = () => {
        const newMessage = {
            zipCodeId: oneZip.id,
            categoryId,
            userId: currentUser.id,
            content
        }
        addMessage(newMessage).then(() => refreshZip())
    }

    const removeMessage = (id) => {
        deleteMessage(id).then(() => refreshZip())
    }
    
    return (
        <>
        <h3>Comments ({oneZip.messageList.length})</h3>
        <div className="feed-container">
            <div className="messages-container">
            {
                oneZip.messageList.map(message => {
                    return (
                        <div className="message-container">
                            <div>
                                <div className="message-category">{message.category.name}</div>
                            </div>
                            <div className="message-content">{message.content}</div>
                            <Button className="deletemsg-btn" onClick={(e) => {
                                e.preventDefault()
                                removeMessage(message.id)
                                
                            }}>X</Button>
                        </div>
                    )
                })
            }
            </div>
            <div className="messageSubmit-container">
                <Input
                    type="select"
                    style={{backgroundColor: "#E6E8F9", border:"none"}}
                    onChange ={(e) => setCategoryId(parseInt(e.target.value))}
                    className="category-input"
                >
                    <option value="3">Category...</option>
                    <option value="1">Buying</option>
                    <option value="2">Selling</option>
                    <option value="3">Other</option>
                </Input>
                <Input
                    type="text"
                    id="newMessage"
                    placeholder="Enter comment here"
                    style={{backgroundColor: "#E6E8F9", border:"none", marginLeft: "1em"}}
                    className="content-input"
                    onChange={(e) => setContent(e.target.value)}
                >
                </Input>
                <Button
                    type="submit"
                    className="message-btn"
                    size="md"
                    onClick={(e) => {
                        e.preventDefault()
                        saveMessage()
                    }}
                >
                Post
                </Button>
            </div>
        </div>
        </>
    )
}