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
    
    return(
        <>
            <Card>
                <CardBody>
                    <CardText>
                        <h3>{pinView.zipCode.zipCode}</h3>
                        <p>{pinView.zipCode.city}, {pinView.zipCode.state.stateName}</p>
                        <p>{pinView.zipCode.county}</p>
                        <p>Current Median Home Price: ${pinView.zipCode.zvhiList.slice(-1)[0].value}</p>     
                    </CardText>
                    <Button onClick={handleClick}>Details</Button>
                    <Button onClick={unpin}>Unpin</Button>
                </CardBody>
            </Card>
        </>
    )
}