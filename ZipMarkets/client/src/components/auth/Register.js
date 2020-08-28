import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, FormFeedback, FormText } from "reactstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { ZipContext } from "../../providers/ZipProvider";

export default function Register() {
  const history = useHistory();
  const { register} = useContext(UserContext);
  const {getZipByZipCode} = useContext(ZipContext)
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [homeZip, setHomeZip] = useState(0);
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
        homeZipId: homeZip.id,
        minHomePrice,
        maxHomePrice
      };
      register(userProfile, password).then(() => history.push("/"));
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  const checkValidZip = debounce((zip) => {
    getZipByZipCode(zip).then(res => {
      if(res.title !== "Not Found" && zip.length !== 0) {
        setHomeZip(res)
      }
      else {
        setHomeZip(0)
      }
    })
  }, 800)
  const zipValidation = () => {
      if(homeZip !== 0) {
        return(
          <>
            <Input
              valid
              id="homezip"
              type="number"
              onChange={(e) => checkValidZip(e.target.value)}
            />
            <FormFeedback valid>Your zip code is valid!</FormFeedback>
          </>
        )
      }
      else {
        return(
          <>
            <Input
              invalid
              id="homezip"
              type="number"
              onChange={(e) => checkValidZip(e.target.value)}
            />
            <FormFeedback>This zip code is not valid.</FormFeedback>
          </>
        )
      }
  }
  
  return (
    <main className="register-container">
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
                  <Label htmlFor="displayName">Home Zip Code</Label>
                  {zipValidation()}
                  <FormText>Please enter a valid U.S. zip code</FormText>
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
                  <Button className="login-btn">Register</Button>
                </FormGroup>
              </fieldset>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
    </main>
  );
}