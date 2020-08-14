import React, { useState, useContext, useEffect } from "react"
import "./MyProfile.css"
import { Card, CardBody, Form, FormGroup, Label, Input, Button, FormFeedback, FormText } from "reactstrap"
import { ZipContext } from "../../providers/ZipProvider";
import { UserContext } from "../../providers/UserProvider";

export default function MyProfile() {
    const [homeZip, setHomeZip] = useState(0);
    const [minHomePrice, setHomePriceMin] = useState();
    const [maxHomePrice, setHomePriceMax] = useState();
    const [displayName, setDisplayName] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [filterByPrice, setFilterByPrice] = useState();
    const {getZipByZipCode} = useContext(ZipContext)
    const {getUser, editUser} = useContext(UserContext)

    useEffect(() => {
        getUser().then((cu) => {
            setCurrentUser(cu)
            setHomeZip(cu.homeZip)
            setDisplayName(cu.displayName)
            setHomePriceMin(cu.minHomePrice)
            setHomePriceMax(cu.maxHomePrice)
            setFilterByPrice(cu.filterByPrice)
        })
    },[])

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
        if (zip !== "") {
          getZipByZipCode(zip).then(res => {
            if(res.title !== "Not Found" && zip.length !== 0) {
              setHomeZip(res)
            }
            else {
              setHomeZip(0)
            }
          })
        }
        else {
          setHomeZip(0)
        }
        }, 800)

      const zipValidation = () => {
          if(currentUser) {
              if(homeZip !== 0) {
                return(
                  <>
                    <Input
                      valid
                      id="homezip"
                      type="number"
                      defaultValue={currentUser.homeZip.zipCode}
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
                      defaultValue={currentUser.homeZip.zipCode}
                      onChange={(e) => checkValidZip(e.target.value)}
                    />
                    <FormFeedback>This zip code is not valid.</FormFeedback>
                  </>
                )
              }
          }
      }


    const saveSettings = (e) => {
        e.preventDefault()
        const user = {
            id: currentUser.id,
            userTypeId: currentUser.userTypeId,
            firebaseUserId: currentUser.firebaseUserId,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            createDateTime: currentUser.createDateTime,
            displayName,
            email: currentUser.email,
            homeZipId: homeZip.id,
            minHomePrice,
            maxHomePrice,
            filterByPrice
          };
          editUser(user)
          alert("Settings have been updated!")
    }
    return (
        <>
        <main className="main-container">
            <div className="container pt-4">
                <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6 settings-card">
                    <h1 className="row justify-content-center settings-title">Settings</h1>
                    <CardBody>
                      <Form onSubmit={saveSettings}>
                        <fieldset>
                          <FormGroup>
                            <Label htmlFor="displayName">Edit Display Name</Label>
                            <Input
                              id="displayName"
                              type="text"
                              defaultValue={displayName}
                              onChange={(e) => setDisplayName(e.target.value)}
                              />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="displayName">Edit Home Zip Code</Label>
                            {zipValidation()}
                            <FormText>Please enter a valid U.S. zip code</FormText>
                          </FormGroup>
                          <FormGroup>
                            <Label for="minHomePrice">Home Price Interest (minimum)</Label>
                            <Input
                              id="minHomePrice"
                              type="number"
                              defaultValue={minHomePrice}
                              onChange={(e) => setHomePriceMin(parseInt(e.target.value))}
                              />
                          </FormGroup>
                          <FormGroup>
                            <Label for="maxHomePrice">Home Price Interest (maximum)</Label>
                            <Input
                              id="maxHomePrice"
                              type="number"
                              defaultValue={maxHomePrice}
                              onChange={(e) => setHomePriceMax(parseInt(e.target.value))}
                              />
                          </FormGroup>
                          <FormGroup>
                            <Label for="filterByPrice">Filter Map By Price Interest</Label>
                            <input
                              id="filterByPrice"
                              type="checkbox"
                              className="checkbox-bigger"
                              checked={filterByPrice}
                              onChange={(e) => setFilterByPrice(!filterByPrice)}
                              />
                              <FormText>Filtering the map by price interest will display zip codes that currently have an average home price
                                within your minimum and maximum prices above. Enabling filtering also GREATLY increases map processing speed allowing
                                for easier exploring of zip codes across the country!
                              </FormText>
                          </FormGroup>
                          <FormGroup>
                            <Button>Save</Button>
                          </FormGroup>
                        </fieldset>
                      </Form>
                  </CardBody>
                </Card>
                </div>
            </div>
        </main>
        </>
    )
}