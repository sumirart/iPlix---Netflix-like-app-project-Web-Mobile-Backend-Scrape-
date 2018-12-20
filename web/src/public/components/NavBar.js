import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

// import action
import { logout } from '../../public/redux/actions/auth';

// import Header from './NavBar/Index';
import Logo from './NavBar/Logo';
import Navigation from './NavBar/Navigation';
import Search from './NavBar/Search';
import UserProfile from './NavBar/UserProfile';

class NavBar extends Component {
    constructor(props) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            toHome: false,
            search: '',
            toSearch: false,
        };
    }

    render() {
        if(this.props.location.pathname === "/login" || this.props.location.pathname === "/register"){
            return null
        } else if(this.props.auth.user.length === 0){
        	return <Redirect to="/landing-page" style={{ marginTop: -90}} />
        }

        if (this.state.toHome === true) {
            return <Redirect to="/" />
        }
        if (this.state.toSearch === true) {
            // const route = '/movies?search=' + this.state.search;
            return <Redirect to={`/movies?search=` + this.state.search} />
        }

        return (

            <header className="Header" style={{ marginBottom: 100 }}>
                <Logo />
                <Navigation />
                <Search />
                <UserProfile />
            </header>
        );
    }
}

const mapsStateToProps = (state) => ({
    auth: state.auth
})

export default withRouter(connect(mapsStateToProps, null)(NavBar));