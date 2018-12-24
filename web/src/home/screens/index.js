import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Button, CardGroup } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

// import actions
import { fetchAll } from '../../public/redux/actions/movie';

import Hero from './components/Hero';

import './global.css'

class Home extends Component {
  constructor(props) {
    super(props);

    this.fetchNextPage = this.fetchNextPage.bind(this);
    this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
    this.state = {
      // isOpen: false,
      carousel: [
        {
          id: 13,
          title: "Aquaman (2018)",
          slug: "Aquaman-(2018)",
          categories_id: 1,
          genre: "Action,Adventure,Fantasy",
          country: "United States of America",
          directors: "James Wan",
          actors: "Jason Momoa,Amber Heard,Willem Dafoe,Patrick Wilson,Dolph Lundgren,Yahya Abdul-Mateen II,Nicole Kidman,Temuera Morrison,Ludi Lin,Graham McTavish",
          rating: 7.9,
          duration: "144 minute",
          description: "Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.",
          thumbnails: "https://image.tmdb.org/t/p/w185//ydUpl3QkVUCHCq1VWvo2rW4Sf7y.jpg",
          video_url: "",
          embed_url: "https://streamango.com/embed/dcsbtaklpbpncpfb/SHQAQUAMANHDTC72_Ganol_si_mkv_mp4",
          created_at: "2018-12-21 20:40:22",
          updated_at: "2018-12-21 20:40:22"
        },
        {
          id: 790,
          title: "X-Men: Apocalypse (2016)",
          slug: "X-Men:-Apocalypse-(2016)",
          categories_id: 1,
          genre: "Action,Adventure,Science Fiction,Fantasy",
          country: "United States of America",
          directors: "Bryan Singer,Nadia Guglieri,Christine Wilson",
          actors: "James McAvoy,Michael Fassbender,Jennifer Lawrence,Nicholas Hoult,Oscar Isaac,Rose Byrne,Evan Peters,Josh Helman,Sophie Turner,Tye Sheridan",
          rating: 6.5,
          duration: "144 minute",
          description: "After the re-emergence of the world's first mutant, world-destroyer Apocalypse, the X-Men must unite to defeat his extinction level plan.",
          thumbnails: "https://image.tmdb.org/t/p/w185//zSouWWrySXshPCT4t3UKCQGayyo.jpg",
          video_url: "",
          embed_url: "https://ganol.si/source_drive_private/index.php?ids=6951&extpass=JBVn",
          created_at: "2018-12-21 20:45:45",
          updated_at: "2018-12-21 20:45:45"
        },
        {
          id: 774,
          title: "The Purge: Election Year (2016)",
          slug: "The-Purge:-Election-Year-(2016)",
          categories_id: 1,
          genre: "Action,Horror,Thriller",
          country: "France,United States of America",
          directors: "James DeMonaco,Jenna Dayton",
          actors: "Elizabeth Mitchell,Frank Grillo,Mykelti Williamson,Edwin Hodge,Raymond J. Barry,Ethan Phillips,Terry Serpico,David Aaron Baker,Kimberly Howe,Joseph Julian Soria",
          rating: 6.3,
          duration: "105 minute",
          description: "Two years after choosing not to kill the man who killed his son, former police sergeant Leo Barnes has become head of security for Senator Charlene Roan, the front runner in the next Presidential election due to her vow to eliminate the Purge. On the night of what should be the final Purge, a betrayal from within the government forces Barnes and Roan out onto the street where they must fight to survive the night.",
          thumbnails: "https://image.tmdb.org/t/p/w185//sm7p6NvWOBSDywdIPhmiX3SLSH8.jpg",
          video_url: "",
          embed_url: "https://ganol.si/source_drive_private/index.php?ids=7012&extpass=-gII",
          created_at: "2018-12-21 20:45:40",
          updated_at: "2018-12-21 20:45:40"
        }
      ],
      movies: [],
      trending: [],
      popular: [],
      page: 1,
      // lastPage: 0,
      loadingSection: false,
      loading: false
    };
  }

  componentDidMount() {
    // this.getMovies(1);
    this.getTrending();
    this.getPopular();
    this.props.dispatch(fetchAll(1));
  }

  // fetch next page
  fetchNextPage() {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage }, () => this.props.dispatch(fetchAll(nextPage)))
    // this.getMovies(nextPage);

    // move to section "semua" after fetching
    const goToAll = document.getElementById('semua');
    goToAll.scrollIntoView();
  }

  // fetch previous page
  fetchPreviousPage() {
    const previousPage = this.state.page - 1;
    this.setState({ page: previousPage }, () => this.props.dispatch(fetchAll(previousPage)))
    // this.getMovies(previousPage);
    
    // move to section "semua" after fetching
    const goToAll = document.getElementById('semua');
    goToAll.scrollIntoView();
  }

  // fetch movies from server
  getMovies(number) {
    this.setState({ loading: true });
    axios.get(process.env.REACT_APP_REST_IP + "/movies?page=" + number)
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
    axios.get(process.env.REACT_APP_REST_IP + "/movies/trending")
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
    axios.get(process.env.REACT_APP_REST_IP + "/movies/popular")
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
    const data = this.props.movie;
    console.log(data);
    console.log(data.isLoading);
    console.log('page: ' + this.state.page)
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
                            <div className="title" style={{ lineHeight: 1.2 }}>{data.title}</div>
                            <div className="rating">
                              {data.rating ?
                                data.rating + ' / 10'
                                : 'no rating'
                              }
                            </div>
                            <div className="plot">{data.description.substr(0, 150) + '..'}</div>
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
                            <div className="title" style={{ lineHeight: 1.2 }}>{data.title}</div>
                            <div className="rating">
                              {data.rating ?
                                data.rating + ' / 10'
                                : 'no rating'
                              }
                            </div>
                            <div className="plot">{data.description.substr(0, 150) + '..'}</div>
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
                  data.isLoading === true ? <div className="text-center">Loading...</div> :

                    data.movie.map(data =>
                      <div key={data.id} className="Item" style={{ backgroundImage: 'url(' + data.thumbnails + ')' }} >
                        <Link to={{ pathname: '/movie/' + data.slug, state: data }} data={data} style={{ color: "white", textDecoration: "none" }}>
                          <div className="overlay">
                            <div className="title" style={{ lineHeight: 1.2 }}>{data.title}</div>
                            <div className="rating">
                              {data.rating ?
                                data.rating + ' / 10'
                                : 'no rating'
                              }
                            </div>
                            <div className="plot">{data.description.substr(0, 150) + '..'}</div>
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
              {this.state.page === data.lastPage || data.lastPage === 0 ?
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

const mapStateToPros = state => ({
  movie: state.movie
})

export default connect(mapStateToPros)(Home);