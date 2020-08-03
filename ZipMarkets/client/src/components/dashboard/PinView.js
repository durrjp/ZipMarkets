import React from "react"
import { useHistory } from "react-router-dom";
import { Card, Button, CardBody, CardText, CardHeader } from "reactstrap";

export default function PinView({pinView}) {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/zip/${pinView.zipCode.id}`);
    }

    if(pinView.length === 0) {
        return (
            <Card>
                <CardBody>
                    <CardHeader><h4>Select a zip code...</h4></CardHeader>
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
                </CardBody>
            </Card>
        </>
    )
}