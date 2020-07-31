import React, { useState } from "react"
import { Collapse, Button, CardBody, Card, CardText } from 'reactstrap';
import { useHistory } from "react-router-dom";


export default function PinnedMarket({pm}) {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const handleClick = () => {
        history.push(`/zip/${pm.zipCode.id}`);
    }

    return (
        <div>
            <Card body>
                <Button outline color="info" onClick={toggle} style={{ marginBottom: '1rem' }}>{pm.zipCode.zipCode}</Button>
                <Collapse isOpen={isOpen}>
                    <Card>
                    <CardBody>
                        <CardText>
                            Anim pariatur cliche reprehenderit,
                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident.
                        </CardText>
                        <Button onClick={handleClick}>Details</Button>
                    </CardBody>
                    </Card>
                </Collapse>
            </Card>
        </div>
    )
}