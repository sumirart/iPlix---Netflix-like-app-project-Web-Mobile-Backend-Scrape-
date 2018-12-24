import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Logo extends Component {
	render() {
		return (
			<div id="logo" className="Logo">
				<Link to="/" className="navbar-brand">
					<img src="https://fontmeme.com/permalink/181218/ee8f475c180be9f61ff15b7e52e3225e.png" alt="iplix  logo" />
				</Link>
			</div>
		);
	}
}
export default Logo;