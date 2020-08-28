import React from "react"
import { Button} from 'reactstrap';
import "./Dashboard.css"


export default function PinnedMarket({pm, setPinView, pinView}) {
    
    const isSelected = () => {
        if(pm.id === pinView.id) {
            return "pm-btn-selected"
        }
        else {
            return "pm-btn"
        }
    }
    const onDragStart = (e, zip) => {
        e.dataTransfer.setData("zip", zip)
    }
    return (
        <div className="pm-container"
             draggable
             onDragStart = {(e) => onDragStart(e, pm.zipCode.zipCode)}
        >
            <Button className={isSelected()} onClick={(e) => {
                e.preventDefault()
                setPinView(pm)}}>
                <div>{pm.zipCode.zipCode}</div>
                <div>{pm.zipCode.city}, {pm.zipCode.state.stateAbbr}</div>
            </Button>
        </div>
    )
}