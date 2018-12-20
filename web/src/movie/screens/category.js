import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Button, Card, CardBody, CardTitle, CardText, CardImg, CardGroup } from 'reactstrap'
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

class Category extends Component {
    constructor(props) {
        super(props);
        this.fetchMore = this.fetchMore.bind(this);
        this.state = {
            movies: [],
            page: 1,
            lastPage: 0,
            loading: false
        };
    }

    componentDidMount() {
        this.getMovies(1)
    }

    fetchMore() {
        const nextPage = this.state.page + 1;
        this.getMovies(nextPage);
    }

    getMovies(number) {
        this.setState({ loading: true });
        // const values = queryString.parse(this.props.location.search);
        if (this.state.movies === undefined || this.state.movies.length == 0) {
            axios.get("http://192.168.0.62:3333/movies/" + this.props.match.params.id + "?page=" + number)
                .then(res => {
                    // console.log(res.data);
                    this.setState({ lastPage: res.data.lastPage, page: number });
                    this.setState({ movies: res.data.data, loading: false });
                })
                .catch(err => alert("Connection to server error, please try again!"))
        } else {
            // {this.props.match.params.id}
            axios.get("http://192.168.0.62:3333/movies/" + this.props.match.params.id + "?page=" + number)
                .then(res => {
                    const pushMovie = [...this.state.movies, ...res.data.data];
                    // console.log(pushMovie);
                    this.setState({ lastPage: res.data.lastPage, page: number });
                    this.setState({ movies: pushMovie, loading: false });
                })
                .catch(err => alert("Connection to server error, please try again!"))
        }

    }

    render() {
        // const values = queryString.parse(this.props.location.search)
        return (
            <section id="semua" style={{ marginTop: 90, marginBottom: "5vh" }}>
                <Container>
                    <div className="row p-3" style={{ padding: 0 }}>
                        <div className="col-md-12" style={{ padding: 0 }}>
                            <h2 className="text-left" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.4, textTransform: "capitalize" }}>Kategori: {this.props.match.params.id}</h2>
                        </div>
                    </div>

                    {
                        this.state.loading === true ? <LoadingOverlay
                            active={this.state.loading}
                            spinner
                            text='Loading...'/> :
                            this.state.lastPage === 0 ?
                                <div className="row p-3">
                                    <div className="col-md-12">
                                        <h1 className="text-center">No movies found!</h1>
                                    </div>
                                </div>
                                :
                                <CardGroup>
                                    <div className="row" style={{ marginBottom: 10 }}>
                                        {
                                            this.state.movies.map(data =>
                                                <div key={data.id} className="Item" style={{ backgroundImage: 'url(' + data.thumbnails + ')' }} >
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
                                                // <div className="col-sm-6 col-md-4 col-lg-2" key={data.id}>
                                                //     <Card style={{ marginBottom: 20 }}>
                                                //         <CardImg top width="100%" src={data.thumbnails} alt={data.title} />
                                                //         <CardBody>
                                                //             <CardTitle>{data.title}</CardTitle>
                                                //             <CardText style={{ maxHeight: 200, overflow: "hidden" }}>{data.description}</CardText>
                                                //             {/* <Link to="/movie/id" className="btn btn-primary btn-sm float-right" data={data} >Tonton</Link> */}
                                                //             <Link to={{ pathname: '/movie/' + data.slug, state: data }} className="btn btn-primary btn-sm float-right" data={data} >Tonton</Link>
                                                //         </CardBody>
                                                //     </Card>
                                                // </div>
                                            )
                                        }
                                    </div>
                                </CardGroup>
                    }
                    <div className="col-md-12" align="center" style={{ marginBottom: 20 }}>
                        {this.state.page === this.state.lastPage || this.state.lastPage === 0 || this.state.lastPage === 1 ?
                            <Button color="secondary" size="large" target="_blank" >Load More</Button>
                            :
                            <Button onClick={this.fetchMore} color="danger" size="large" target="_blank">
                                Load More</Button>
                        }
                    </div>
                </Container>
            </section>
        );
    }
}

export default Category;