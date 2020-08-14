import React, { useContext } from "react"
import { useHistory } from "react-router-dom";
import { Card, Button, CardBody, CardText} from "reactstrap";
import { PinnedMarketContext } from "../../providers/PinnedMarketProvider";

export default function PinView({pinView, currentUser, refresh, setPinView}) {
    const history = useHistory();
    const {deletePinnedMarket} = useContext(PinnedMarketContext)

    const handleClick = () => {
        history.push(`/zip/${pinView.zipCode.id}`);
    }
    const unpin = (e) => {
        e.preventDefault()
        const foundPM = currentUser.userPinnedMarkets.find(pm => pm.zipCodeId === pinView.zipCodeId)
        deletePinnedMarket(foundPM.id)
        setPinView([])
        refresh()
    }

    if(pinView.length === 0) {
        return (
            <Card>
                <CardBody>
                    <h4>Select a zip code...</h4>
                </CardBody>
            </Card>
        )
    }
    const zvhiValue = pinView.zipCode.zvhiList.slice(-1)[0].value
    const newzvhiValue = zvhiValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return(
        <>
            <Card className="pinview-card">
                <CardBody>
                    <CardText>
                        <div className="unpinbtn-container">
                            <Button className="unpinbtn" onClick={unpin}>Unpin</Button>
                        </div>
                        <h3>{pinView.zipCode.zipCode}</h3>
                        <p>{pinView.zipCode.city}, {pinView.zipCode.state.stateName}</p>
                        <p>{pinView.zipCode.county}</p>
                        <p>Current Median Home Price: ${newzvhiValue}</p>     
                    </CardText>
                    <Button className="details-btn" onClick={handleClick}>Details</Button>
                </CardBody>
            </Card>
        </>
    )
}