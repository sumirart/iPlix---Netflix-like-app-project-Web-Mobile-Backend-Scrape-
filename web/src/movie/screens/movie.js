import React, { Component } from 'react';
import { Container, Row, Col, CardGroup } from 'reactstrap';
import Iframe from 'react-iframe'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import axios from 'axios';

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: false
        };
    }

    componentDidMount() {
        this.getMovies(this.props.location.state.id)
    }
    componentDidUpdate(prevProps){
        if(this.props.location.state.id !== prevProps.location.state.id){
            console.log('props change')
            this.getMovies(this.props.location.state.id)
        }
    }


    getMovies(id) {
        this.setState({ loading: true });
        axios.get("http://192.168.0.62:3333/movies/" + id + "/related")
            .then(res => {
                // console.log(res.data);
                // this.setState({ lastPage: res.data.lastPage, page: number });
                this.setState({ movies: res.data.data, loading: false });
            })
            .catch(err => {
                alert("Connection to server error, please try again!");
                this.setState({ loading: false })
            })
    }

    render() {
        // if no movies
        if (this.props.location.state === undefined) {
            return <Redirect to="/" />
            // alert("owww")
        }

        // console.log(this.props)
        // console.log(this.props.location.state.id)
        // console.log(this.props.location.pathname) //"/movie/Nonton-"

        const data = this.props.location.state;
        return (
            // <div style={{ marginTop: 100, marginBottom: "5vh" }}>
            <Container style={{ marginTop: 100, marginBottom: "5vh" }}>
                <div className="col-md-12" align="center" style={{ marginBottom: 20 }}>

                    <Iframe url={data.embed_url}
                        height="70vh"
                        position="relative"
                        id="myId"
                        className="myClassname"
                        // height="100%"
                        // position="absolute"
                        width="100%"
                        styles={{ maxHeight: "800px" }}
                        allowFullScreen />
                </div>
                <h2 className="text-left" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.4, textTransform: "capitalize" }}>{data.title.replace(/(^\Nonton +|\ Subtitle Indonesia+$)/mg, '')}</h2>
                <hr style={{ borderTop: "3px solid white" }} />
                <Row>
                    <Col style={{ marginTop: 10, marginBottom: 20 }}>
                        <p>{data.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs="3" >
                        <img src={data.thumbnails} alt={data.title} style={{ width: "100%", borderRadius: 5 }} />
                    </Col>
                    <Col xs="auto">
                        <p>Rating: {data.rating ? data.rating.substr(0, 3) + ' / 10' : 'no rating'} </p>
                        <p>Genre: {data.genre}</p>
                        <p>Directors: {data.director}</p>
                        <p>Writers: {data.writers}</p>
                        {/* <p>Description: {data.description}</p> */}
                    </Col>
                </Row>

                <Row style={{ marginTop: 30 }}>
                    <Col>
                        <h2 className="text-left" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.4, textTransform: "capitalize" }}>Related</h2>
                    </Col>
                </Row>
                <hr style={{ borderTop: "1px solid white" }} />
                <CardGroup>
                    <div className="row" style={{ marginBottom: 30, marginLeft: 0 }}>
                        { this.state.loading === true ? <div className="text-center">Loading...</div> :
                            this.state.movies.slice(0, 5).map(data =>
                                <div key={data.id} className="Item" style={{ backgroundImage: 'url(' + data.thumbnails + ')', height: 250, width: 214 }} >
                                    <Link to={{ pathname: '/movie/' + data.slug, state: data }} data={data} style={{ color: "white", textDecoration: "none" }}>
                                        <div className="overlay">
                                            <div className="title" style={{ lineHeight: 1.2 }}>{data.title.replace(/(^\Nonton +|\ Subtitle Indonesia+$)/mg, '')}</div>
                                            <div className="rating">
                                                {data.rating ?
                                                    data.rating.substr(0, 3) + ' / 10'
                                                    : 'no rating'
                                                }
                                            </div>
                                            <div className="plot">{data.description.substr(0, 100) + '..'}</div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </CardGroup>
            </Container>
            // </div>
        );
    }
}

export default Movie;