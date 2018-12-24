import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem
} from 'reactstrap';


// import Header from './NavBar/Index';
import Logo from './NavBar/Logo';
import Navigation from './NavBar/Navigation';
import Search from './NavBar/Search';
import UserProfile from './NavBar/UserProfile';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            toHome: false,
            search: '',
            toSearch: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        // if(this.props.location.pathname === "/login" || this.props.location.pathname === "/register"){
        //     return null
        // }

        if (this.state.toHome === true) {
            return <Redirect to="/" />
        }

        if (this.state.toSearch === true) {
            // const route = '/movies?search=' + this.state.search;
            return <Redirect to={`/movies?search=` + this.state.search} />
        }

        return (
            <div>
                <Navbar expand="md" className="Header navbar-dark">

                    <Logo />
                    <NavbarToggler onClick={this.toggle} className='mr-2' style={{ float: "right" }}>
                        <span className='navbar-toggler-icon'></span>
                    </NavbarToggler>

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Navigation />
                            </li>
                            <li className="nav-item">
                                <Search />
                            </li>
                        </ul>
                        <Nav className="ml-auto" navbar>
                            <UserProfile />
                        </Nav>
                    </Collapse>
                </Navbar>
                
                    {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
                {/* <Navbar className="Header navbar-dark" expand="md">
                    <Logo />
                    <NavbarToggler onClick={this.toggle} style={{ float: "right" }} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Navigation />
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Search />
                            </NavItem>
                            <NavItem>
                                <UserProfile />
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar> */}
            </div>
        );
    }
}

const mapsStateToProps = (state) => ({
    auth: state.auth
})

export default withRouter(connect(mapsStateToProps, null)(NavBar));