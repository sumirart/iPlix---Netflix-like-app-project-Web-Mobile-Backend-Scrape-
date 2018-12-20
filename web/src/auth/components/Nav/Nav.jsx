import React from 'react';

import styled, { css } from 'styled-components';


const Nav = styled.nav`
    height: 90px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    /* Netflix logo */
    img {
        margin: 15px;
        vertical-align: middle;
    }
    .logo {
        display: inline-block;
        line-height: 90px;
        margin: 0 0 0 3%;
    }
`;


const nav = () => {
    return (
      <Nav>
        <a href={"/landing-page"} className="logo">
            {/* <img src={netflixlogo} alt="Iplix Logo" /> */}
            <img src='https://fontmeme.com/permalink/181219/d57c3dc63d26ff6f51d5195e3f12a35f.png' alt="Netflix Logo" />
        </a>
      </Nav>
    )
}

export default nav;