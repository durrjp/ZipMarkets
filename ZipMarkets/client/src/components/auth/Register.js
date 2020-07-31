import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [homeZip, setHomeZip] = useState();
  const [minHomePrice, setHomePriceMin] = useState();
  const [maxHomePrice, setHomePriceMax] = useState();
  

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match.");
    } else {
      const userProfile = {
        firstName,
        lastName,
        displayName,
        email,
        homeZip,
        minHomePrice,
        maxHomePrice
      };
      register(userProfile, password).then(() => history.push("/"));
    }
  };
  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form onSubmit={registerClick}>
              <fieldset>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="homezip">Home Zip Code</Label>
                  <Input
                    id="homezip"
                    type="number"
                    onChange={(e) => setHomeZip(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="minHomePrice">Home Price Interest (minimum)</Label>
                  <Input
                    id="minHomePrice"
                    type="number"
                    onChange={(e) => setHomePriceMin(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="maxHomePrice">Home Price Interest (maximum)</Label>
                  <Input
                    id="maxHomePrice"
                    type="number"
                    onChange={(e) => setHomePriceMax(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Button>Register</Button>
                </FormGroup>
              </fieldset>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}