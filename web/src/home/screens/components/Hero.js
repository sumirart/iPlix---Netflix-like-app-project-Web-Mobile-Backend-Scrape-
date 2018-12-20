import React, { Component } from "react";
import { Link } from 'react-router-dom'



class Hero extends Component {
    render() {
        const data = this.props.data;
        // console.log(data);
        return (
            <div id="hero" className="Hero" style={{ backgroundImage: 'url(' + this.props.backgroundImage + ')' }}>
                <div className="content">
                    {/* <img className="logo" src="http://www.returndates.com/backgrounds/narcos.logo.png" alt="" /> */}
                    <h1 style={{ fontSize: 45, fontWeight: 600, lineHeight: 1.4, marginBottom: 20, paddingTop: 150 }}>{this.props.title}</h1>
                    <p>{this.props.description}</p>
                    <div className="button-wrapper">
                    <Link className = "Button" data-primary={true} to={{ pathname: '/movie/' + data.slug, state: data }} data={data} style={{ color: "white", textDecoration: "none" }}>
                        Watch Now
                    </Link>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        );
    }
}
export default Hero;