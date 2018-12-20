import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  Container,
  Button,
  CardGroup
} from 'reactstrap';
import axios from 'axios';

import Hero from './components/Hero';

import './global.css'

// CAROUSEL
// import { Carousel } from 'react-responsive-carousel';
// import "../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
// import '../carousel.css'

class Home extends Component {
  constructor(props) {
    super(props);

    // this.toggle = this.toggle.bind(this);
    this.fetchNextPage = this.fetchNextPage.bind(this);
    this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
    this.state = {
      // isOpen: false,
      carousel: [
        {
          id: 122,
          categories_id: 1,
          title: "Aquaman 2018 CAM",
          slug: "Aquaman-2018-CAM",
          thumbnails: "https://bioskopkeren.fun/wp-content/uploads/2018/12/Movie-Aquaman-2018-95x125.jpg",
          video_url: "",
          embed_url: "https://nonton.bioskopkeren.pro/redirector.php?id=WGRnZ1R2eHRoNklHUnUya1F6MXE5WWVWOVl3N0lGQmYyalg4UXZUOEpSS25VUENFSUxITzhxOUZhNk9MdE42T3gxRUxTVlBMTG5oY0krMWplemNIckRPRU0vQjVXUlpmWXl5b3NwVDFIMnVsT2VpNUVZQkNyWHNERW1iemVPa1lONDhZd1hmN0pHRmRBMm1EQTV1aXc0QlEwOVZJOVkyQy9qd0dmei9RVGhMbFl1YUFrZlRML0RHRUpjcWhuYTZXY25VZU1HcmFaUE10Y1ZWcFAwN3RrdWh3dU8wdmdXTnFORFBSb3JScm1teTZuZGpnZXJaaVNMNExtVE56Zm11Yg==",
          rating: "7,9/10",
          viewer: 0,
          description: "Aquaman Sejak kecil, Arthur Curry (Jason Momoa) sudah tidak pernah mendapatkan kasih sayang Ibunya. Hanya Tom Curry (Temuera Morrison) yang memberikan petuah-petuah hidup seorang manusia, dan berharap putranya menjadi orang yang berguna di masa depan. Selain mendapatkan petuah dari Tom Curry, Arthur juga mendapatkan wejangan dari Vulko (Willem Dafoe). Orang yang sangat dipercaya ibunya. Kebalikan dari ayah Arthur, Vulko justru mengajarkan hal-hal tentang bertahan hidup. Menyeimbangkan bagaimana Arthur bisa menjadi seorang yang suatu saat nanti akan menghempaskan ombak dari lautan dengan damai. ",
          director: "James Wan",
          writers: "David Leslie Johnson-McGoldrick (screenplay by), Will Beall (screenplay by)",
          genre: "2018,Action,Adventure,Fantasy,Movie",
          created_at: "2018-12-19 15:52:58",
          updated_at: "2018-12-19 15:52:58"
        },
        {
          id: 2429,
          categories_id: 1,
          title: "Nonton Film Online X-Men Apocalypse Subtitle Indonesia",
          slug: "Nonton-Film-Online-X-Men-Apocalypse-Subtitle-Indonesia",
          thumbnails: "https://bioskopkeren.fun/wp-content/uploads/2016/05/xmenapocalypse-102x125.jpg",
          video_url: "",
          embed_url: "https://nonton.bioskopkeren.pro/redirector.php?id=WGRnZ1R2eHRoNklHUnUya1F6MXE5WWVWOVl3N0lGQmYyalg4UXZUOEpSSnp6aUQ3cmhuSDVBUFFTcG1RMnBxWVgxOXRyMHJrQ1kyZHVwcjVzaVlPeEtqUFFlemFaVTNnWW9lQTE1RHJoOXVLckZqdzNmVmpQamtkYzRVcXowWDdTZXlOR3M1ODJDU25ZWXVDNzJqUXgzQ01jMEFFWmhNODZ5OFR6ZTlibG83Qnd4SGgyUmlnRWdqNDJrZGk2MUdjUHAyaU1jbUgzR1o0a3N5WHRFei9YRGVIdHpkOE5ObXlaYmNwS2ozOUh4VzBzNzJuVHJKNGZFVGkyNFlvbzJRczR2OFhWQXRaSm9lRUFyRmZYVFlrU1E9PQ==",
          rating: "7,6/10",
          viewer: 0,
          description: "Watch Streaming dan download film movie X-Men: Apocalypse 2016 subtitle bahasa indonesia online gratis di bioskopkeren.fun. Nonton movie Nonton Film Online Bioskop Online Watch Streaming Download Sub Ind",
          director: "Bryan Singer",
          writers: "Simon Kinberg (screenplay), Bryan Singer (story)",
          genre: "2016,Action,Adventure,Fantasy,Movie",
          created_at: "2018-12-19 16:00:47",
          updated_at: "2018-12-19 16:00:47"
        },
        {
          id: 4533,
          categories_id: 1,
          title: "Nonton The Purge Election Year Subtitle Indonesia",
          slug: "Nonton-The-Purge-Election-Year-Subtitle-Indonesia",
          thumbnails: "https://bioskopkeren.fun/wp-content/uploads/2016/07/Movie-The-Purge-Election-Year-2016-102x125.jpg",
          video_url: "",
          embed_url: "https://nonton.bioskopkeren.pro/redirector.php?id=WGRnZ1R2eHRoNklHUnUya1F6MXE5WWVWOVl3N0lGQmYyalg4UXZUOEpSSitvQUx5VmoyUDFuaUZHUnFqa2ZsejRJUk9ZdFRZUHByMWVzcExYT0pCTDZCYWNkWklZSW5JWFJMMlIyeGRIV09jeGxwdUloVlVzSGdwK3BKcjBCVTZnNENTOE85VHpuZ3V1WExncmtmZW54ZXVsWlJZT2FJNFZNRE1sYWFKbE9ac3k0amI0MTRxUEhPLzJZbWpwQVhYTE9nUFZOdEh1UGQ0Q2xYeFA1aEl4ZTZScWpaZU0vc29oYlBwRjlURmlVNVc3bStCQXBrTHR1RmdqY1lFdkQ5eWRDYkhFWk5VSFlEcjF3Q1V1RVovSHc9PQ==",
          rating: "6,3/10",
          viewer: 0,
          description: "Watch Streaming dan download film movie The Purge Election Year 2016 subtitle bahasa indonesia online gratis di bioskopkeren.fun. Nonton movie Nonton Film Online Bioskop Online Watch Streaming Download Sub Ind",
          director: "James DeMonaco",
          writers: "James DeMonaco",
          genre: "2016,Action,Horror,Movie,Sci-Fi",
          created_at: "2018-12-19 16:27:15",
          updated_at: "2018-12-19 16:27:15"
        }
      ],
      movies: [],
      trending: [],
      popular: [],
      page: 1,
      lastPage: 0,
      loadingSection: false,
      loading: false
    };
  }

  componentDidMount() {
    this.getMovies(1);
    this.getTrending();
    this.getPopular();
  }

  // fetch next page
  fetchNextPage() {
    const nextPage = this.state.page + 1;
    this.getMovies(nextPage);

    // move to section "semua" after fetching
    const goToAll = document.getElementById('semua');
    goToAll.scrollIntoView();
  }

  // fetch previous page
  fetchPreviousPage() {
    const previousPage = this.state.page - 1;
    this.getMovies(previousPage);

    // move to section "semua" after fetching
    const goToAll = document.getElementById('semua');
    goToAll.scrollIntoView();
  }

  // fetch movies from server
  getMovies(number) {
    this.setState({ loading: true });
    axios.get("https://iplix.herokuapp.com/movies?page=" + number)
      .then(res => {
        // console.log(res.data.data);
        this.setState({
          movies: res.data.data,
          lastPage: res.data.lastPage,
          page: number,
          loading: false
        });
        // console.log(this.state)
      })
      .catch(err => {
        alert("Connection to server error, please try again!");
        this.setState({ loading: false })
      })
  }

  // fetch trending
  getTrending() {
    this.setState({ loadingSection: true });
    axios.get("https://iplix.herokuapp.com/movies/trending")
      .then(res => {
        // console.log(res.data.data);
        this.setState({
          trending: res.data.data,
          loadingSection: false
        });
        // console.log(this.state)
      })
      .catch(err => {
        alert("Connection to server error, please try again!");
        this.setState({ loadingSection: false })
      })
  }

  // fetch popular
  getPopular() {
    this.setState({ loadingSection: true });
    axios.get("https://iplix.herokuapp.com/movies/popular")
      .then(res => {
        // console.log(res.data.data);
        this.setState({
          popular: res.data.data,
          loadingSection: false
        });
        // console.log(this.state)
      })
      .catch(err => {
        alert("Connection to server error, please try again!");
        this.setState({ loadingSection: false })
      })
  }

  render() {
    return (
      <div style={{ fontFamily: "Lato, sans-serif" }}>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              {/* THE PURGE ELECTION */}
              {/* <Link to={{ pathname: '/movie/' + data.slug, state: data }} data={data} style={{ color: "white", textDecoration: "none" }}> */}
              <Hero
                data={this.state.carousel[2]}
                title="The Purge: Election Year"
                description="Watch Streaming dan download film movie The Purge Election Year 2016 subtitle bahasa indonesia online gratis di bioskopkeren.fun. Nonton movie Nonton Film Online Bioskop Online Watch Streaming Download Sub Ind."
                backgroundImage="http://ucsdguardian.org/wp-content/uploads/2016/07/Film_-The-Purge-Election-Year-Image-Courtesy-of-HDQ-Walls.jpg"
              />
            </div>
            <div className="carousel-item">
              <Hero
                data={this.state.carousel[0]}
                title="Aquaman"
                description="Aquaman Sejak kecil, Arthur Curry (Jason Momoa) sudah tidak pernah mendapatkan kasih sayang Ibunya. Hanya Tom Curry (Temuera Morrison) yang memberikan petuah-petuah hidup seorang manusia, dan berharap putranya menjadi.."
                backgroundImage="https://am23.akamaized.net/tms/cnt/uploads/2018/08/aquaman-poster-e1537799094924.jpeg"
              />
            </div>
            <div className="carousel-item">
              <Hero
                data={this.state.carousel[1]}
                title="X-Men Apocalypse"
                description="Watch Streaming dan download film movie X-Men: Apocalypse 2016 subtitle bahasa indonesia online gratis di bioskopkeren.fun. Nonton movie Nonton Film Online Bioskop Online Watch Streaming Download Sub Ind"
                backgroundImage="https://heroichollywood.com/wp-content/uploads/2016/05/maxresdefault-2.jpg"
              />
            </div>
          </div>
          <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        {/* section trending */}
        <section id="trending">
          <Container>
            <div className="row p-3">
              <div className="col-md-12">
                <h2 className="text-left" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.4 }}>
                  Trending
                </h2>
              </div>
            </div>
            <CardGroup>
              <div className="row" style={{ marginBottom: 30 }}>
                {
                  this.state.loadingSection === true ? <div className="text-center">Loading...</div> :

                    this.state.trending.slice(0, 5).map(data =>
                      <div key={data.id} className="Item" style={{ backgroundImage: 'url(' + data.thumbnails + ')', width: 218 }} >
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
        </section>

        <hr />

        {/* section popular */}
        <section id="popular">
          <Container>
            <div className="row p-3">
              <div className="col-md-12">
                <h2 className="text-left" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.4 }}>
                  Popular
                </h2>
              </div>
            </div>
            <CardGroup>
              <div className="row" style={{ marginBottom: 30 }}>
                {
                  this.state.loadingSection === true ? <div className="text-center">Loading...</div> :

                    this.state.popular.slice(0, 5).map(data =>
                      <div key={data.id} className="Item" style={{ backgroundImage: 'url(' + data.thumbnails + ')', width: 218 }} >
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
        </section>

        <hr />

        {/* section all movies*/}
        <section id="semua">
          <Container>
            <div className="row p-3" style={{ padding: 0 }}>
              <div className="col-md-12" style={{ padding: 0 }}>
                <h2 className="text-left"
                  style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.4 }}>All Movies</h2>
              </div>
            </div>

            <CardGroup>
              <div className="row" style={{ marginBottom: 30 }}>
                {
                  this.state.loading === true ? <div className="text-center">Loading...</div> :

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
                    )
                }
              </div>
            </CardGroup>

            <div className="col-md-12" align="center" style={{ marginBottom: 20 }}>
              {this.state.page === 1 ?
                <Button style={{ margin: 10 }} size="large" target="_blank" >Before</Button>
                :
                <Button style={{ margin: 10 }} onClick={this.fetchPreviousPage} color="danger" size="large" target="_blank">
                  Before</Button>
              }
              {this.state.page === this.state.lastPage || this.state.lastPage === 0 ?
                <Button style={{ margin: 10 }} size="large" target="_blank" >Next</Button>
                :
                <Button style={{ margin: 10 }} onClick={this.fetchNextPage} color="danger" size="large" target="_blank">
                  Next</Button>
              }
            </div>
          </Container>
        </section>
      </div>
    );
  }
}

// class Item extends Component {
//   render() {
//     return (
//       <div className="Item" style={{ backgroundImage: 'url(' + this.props.backdrop + ')' }} >
//         <div className="overlay">
//           <div className="title" style={{ lineHeight: 1.2 }}>{this.props.title}</div>
//           <div className="rating">{this.props.score} / 10</div>
//           <div className="plot">{this.props.overview}</div>
//         </div>
//       </div>
//     );
//   }
// }

export default Home;