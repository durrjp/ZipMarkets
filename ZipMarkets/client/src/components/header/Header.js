import React, { useContext, useState } from "react"
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Collapse,
    NavbarToggler
} from 'reactstrap';
import { UserContext } from "../../providers/UserProvider";


export default function Header() {
    const { isLoggedIn, logout, isAdmin } = useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand>
                    Zip Markets
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    { /* When isLoggedIn === true, we will render the Home link */}
                    {isLoggedIn &&
                    <>
                        <NavItem>
                        <NavLink tag={RRNavLink} to="/">Explore</NavLink>
                        </NavItem>
                    </>
                    }
                </Nav>
                <Nav navbar>
                    {isLoggedIn &&
                    <>
                        <NavItem>
                        <NavLink 
                            aria-current="page"
                            className="nav-link"
                            style={{ cursor: "pointer" }}
                        >My Profile
                        </NavLink>
                        </NavItem>
                    </>
                    }
                    {isLoggedIn &&
                    <>
                        <NavItem>
                        <NavLink tag={RRNavLink} to="/"
                            aria-current="page"
                            className="nav-link"
                            style={{ cursor: "pointer" }}
                            onClick={logout}>Logout
                        </NavLink>
                        </NavItem>
                    </>
                    }
                </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}