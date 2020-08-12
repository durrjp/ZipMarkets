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
import logo from "../../images/ZipMarketsSmall.png"
import "./Header.css"


export default function Header() {
    const { isLoggedIn, logout, isAdmin } = useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="header-container">
            <Navbar light expand="md">
                <NavbarBrand>
                    <img height="40px" src={logo} alt="logo" />
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
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/dashboard">Dashboard</NavLink>
                        </NavItem>
                    </>
                    }
                </Nav>
                <Nav navbar>
                    {isLoggedIn &&
                    <>
                        <NavItem>
                        <NavLink tag={RRNavLink} to="/myprofile"
                            aria-current="page"
                            className="nav-link"
                            style={{ cursor: "pointer" }}
                        ><svg width="30" height="30" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M51 29.7134V21.2866L44.087 19.9119C43.6987 18.6569 43.2205 17.4615 42.5929 16.296L46.4479 10.5286L40.4713 4.55205L34.7039 8.40703C33.5385 7.77939 32.3431 7.30117 31.088 6.91289L29.7134 0H21.2866L19.9119 6.91299C18.6569 7.30127 17.4615 7.77949 16.296 8.40713L10.5287 4.55215L4.55215 10.5287L8.40713 16.2961C7.77949 17.4615 7.30127 18.6569 6.91299 19.912L0 21.2866V29.7134L6.91299 31.0881C7.30127 32.3431 7.77949 33.5385 8.40713 34.704L4.55215 40.4713L10.5287 46.4479L16.2961 42.5929C17.4615 43.2205 18.6569 43.6987 19.912 44.087L21.2866 51H29.7134L31.0881 44.087C32.3431 43.6987 33.5385 43.2205 34.704 42.5929L40.4714 46.4479L46.448 40.4713L42.593 34.7039C43.2206 33.5385 43.6988 32.3431 44.0871 31.088L51 29.7134ZM25.5 35.959C19.7326 35.959 15.041 31.2674 15.041 25.5C15.041 19.7326 19.7326 15.041 25.5 15.041C31.2674 15.041 35.959 19.7326 35.959 25.5C35.959 31.2674 31.2674 35.959 25.5 35.959Z" fill="black"/>
                        <path d="M44.087 31.0881C43.6987 32.3431 43.2205 33.5385 42.5929 34.704L46.4479 40.4714L40.4713 46.448L34.7039 42.593C33.5385 43.2206 32.3431 43.6988 31.088 44.0871L29.7134 51H25.5V35.959C31.2674 35.959 35.959 31.2674 35.959 25.5C35.959 19.7326 31.2674 15.041 25.5 15.041V0H29.7134L31.0881 6.91299C32.3431 7.30127 33.5385 7.77949 34.704 8.40713L40.4713 4.55215L46.4479 10.5287L42.5929 16.2961C43.2205 17.4615 43.6987 18.6569 44.087 19.912L51 21.2866V29.7134L44.087 31.0881Z" fill="black"/>
                        </svg>                        
                        </NavLink>
                        </NavItem>
                    </>
                    }
                    {isLoggedIn &&
                    <>
                        <NavItem>
                        <NavLink tag={RRNavLink} to="/about"
                            aria-current="page"
                            className="nav-link"
                            style={{ cursor: "pointer" }}
                        ><svg width="30" height="30" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40.5 0C18.1687 0 0 18.1687 0 40.5C0 62.8313 18.1687 81 40.5 81C62.8313 81 81 62.8313 81 40.5C81 18.1687 62.8313 0 40.5 0ZM47.2501 65.8125C47.2501 66.7453 46.4953 67.5001 45.5625 67.5001H35.4375C34.5047 67.5001 33.7499 66.7453 33.7499 65.8125V40.5H32.0624C31.1296 40.5 30.3748 39.7452 30.3748 38.8124V32.0624C30.3748 31.1296 31.1296 30.3748 32.0624 30.3748H45.5625C46.4953 30.3748 47.2501 31.1296 47.2501 32.0624V65.8125ZM40.5 27.0001C36.7773 27.0001 33.7499 23.9728 33.7499 20.25C33.7499 16.5272 36.7773 13.4999 40.5 13.4999C44.2227 13.4999 47.2501 16.5272 47.2501 20.25C47.2501 23.9728 44.2227 27.0001 40.5 27.0001Z" fill="black"/>
                        </svg>
                                               
                        </NavLink>
                        </NavItem>
                    </>
                    }
                    {isLoggedIn &&
                    <>
                        <NavItem>
                        <NavLink tag={RRNavLink} to="/login"
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