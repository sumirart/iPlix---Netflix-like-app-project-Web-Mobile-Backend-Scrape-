import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Container
} from 'reactstrap';
// import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap'

class Categories extends Component {
    // constructor(props) {
    //     super(props);
    // }

    // toggle() {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }

    render() {
        // console.log(this.props)
        return (
            null
            // <div style={{ marginTop: "5vh", marginBottom: "5vh" }}>
            //     <Container>
            //         <div className="row p-3">
            //             <div className="col-md-12">
            //                 <h2 className="text-left">Kategori</h2>
            //             </div>
            //         </div>
            //         <ul className="list-group">
            //             <li className="list-group-item">
            //                 <Link to="/category/romance" >Romance</Link>
            //             </li>
            //             <li className="list-group-item">
            //                 <Link to="/category/sci-fi" >Sci-Fi</Link>
            //             </li>
            //             <li className="list-group-item">
            //                 <Link to="/category/horror" >Horror</Link>
            //             </li>
            //             <li className="list-group-item">
            //                 <Link to="/category/action" >Action</Link>
            //             </li>
            //             <li className="list-group-item">
            //                 <Link to="/category/thriller" >Thriller</Link>
            //             </li>
            //         </ul>
            //     </Container>
            // </div>
        );
    }
}

export default Categories;