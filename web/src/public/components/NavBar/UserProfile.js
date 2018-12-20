import React, { Component } from "react";
import { connect } from 'react-redux';

import { NavLink } from 'reactstrap';

// import actions
import { logout } from '../../redux/actions/auth';

class UserProfile extends Component {
	constructor(props) {
		super(props);

		this.toggleShow = this.toggleShow.bind(this);
		this.state = {
			show: false,
		};
	}

	toggleShow() {
		this.setState({ show: !this.state.show })
	}

	logout = _ => {
		this.props.dispatch(logout())
		// .then(() => {
		//     this.setState({ toHome: true });
		// })
	}

	render() {
		return (
			<div className="UserProfile">
				{
					this.props.auth.user.length === 0 ?
						<div className="User">
							{/* <NavLink href="/login">Login</NavLink> */}
							<div className="name btn-SignIn" style={{ padding: 0 }}>
								<NavLink href="/login">Sign In</NavLink>
							</div>
						</div>
						:
						<div>
							<div className="User" onClick={this.toggleShow}>
								<div className="name">{this.props.auth.user[0].name}</div>
								<div className="image"><img src="http://lorempixel.com/96/96/" alt="custom image" /></div>
							</div>
							{
								this.state.show ?
									<div className="UserProfile-menu" style={{ display: "block" }}>
										{/* <div className="UserProfileSwitch">
											<ul>
												<li>
													<div className="UserProfile-image">
														<img src="https://randomuser.me/api/portraits/men/3.jpg" />
													</div>
													<div style={{ textTransform: 'capitalize' }}>{this.props.auth.user[0].name}</div>
												</li>
											</ul>
										</div> */}
										<div className="UserNavigation">
											<ul>
												<li>Your Account</li>
												<li>Help Center</li>
												<li><button onClick={() => this.logout()} className="btn-blank">Sign Out</button></li>
											</ul>
										</div>
									</div>
									:
									null
							}

						</div>
				}
			</div>
		);
	}
}

const mapsStateToProps = (state) => ({
	auth: state.auth
})

export default connect(mapsStateToProps)(UserProfile);