import React, { Component } from "react";


class HeroButton extends Component {
    render(){
        return(
            <a href = "/" className = "Button" data-primary={ this.props.primary }> { this.props.text }</a >
        )
    }
}


class Hero extends Component {
    render() {
        return (
            <div id="hero" className="Hero" style={{ backgroundImage: 'url(https://images.alphacoders.com/633/633643.jpg)' }}>
                <div className="content">
                    <img className="logo" src="http://www.returndates.com/backgrounds/narcos.logo.png" alt="" />
                    <h2 style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.4, marginBottom: "1em" }}>Season 2 now available</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.</p>
                    <div className="button-wrapper">
                        <HeroButton primary={true} text="Watch now" />
                        {/* <HeroButton primary={false} text="+ My list" /> */}
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        );
    }
}
export default Hero;