import React, { Component } from "react";
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom'


// import action
import { logout } from '../../redux/actions/auth';
// import { logout } from '../../public/redux/actions/auth';


class Search extends Component {
	constructor(props) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            toHome: false,
            search: '',
            // toSearch: false,
        };
	}

	logout = _ => {
        this.props.dispatch(logout())
            .then(() => {
                this.setState({ toHome: true });
            })
	}
	
	handleChange(e) {
        this.setState({ search: e.target.value });
	}

	handleSubmit(e) {
        e.preventDefault();
        if (this.state.search !== '') {
            // console.log(this.state.search);
			this.props.history.push({
				pathname: '/movies',
				search: '?search=' + this.state.search,
				// state: { detail: response.data }
			  })
			  this.setState({search: ''});
        }
    }
	
    render() {
		if (this.state.toHome === true) {
            return <Redirect to="/" />
        }
        // if (this.state.toSearch === true) {
        //     // const route = '/movies?search=' + this.state.search;
        //     return <Redirect to={`/movies?search=` + this.state.search} />
		// }
		
		// console.log(this.props)
        return (
			<form onSubmit={e => this.handleSubmit(e)} id="search" className="Search">
				<input type="search" placeholder="Search for a title..." value={this.state.search} onChange={e => this.handleChange(e)} />
			</form>
		);
    }
}
export default withRouter(Search);