import React, { Component } from 'react';
import axios from 'axios'
import { Header, Text, Left, Body, Right, Button, Icon, Thumbnail, Content, Container, Spinner, Title } from 'native-base';
import { TouchableOpacity, ImageBackground, Dimensions, Image, View, Share } from 'react-native';

export default class MovieInfo extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    const { page, limit } = this.state
    const url = 'http://iplix.herokuapp.com/movies/' + this.props.navigation.state.params.id
    this.setState({ loading: true })
    axios.get(url)
      .then(async res => {
        await this.setState({
          data: res.data
        })
        { console.warm(this.state.data.movies[0].genre.split(',')) }
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false })
      });
  }

  handleShare = (title, link) => {
    Share.share({
      message: 'Ayo nonton film ' + title + ' gratis di https://pacific-reef-98235.herokuapp.com/movies/' + link,
      url: link,
      title: 'ELANG 4'
    }, {
        // Android only:
        dialogTitle: 'Bagikan film ' + title,
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      })
  }


  render() {
    return (
      <Container androidStatusBarColor="#0e0e0e">
        {this.state.data !== null ?
          <ImageBackground
            source={{ uri: this.props.navigation.state.params.thumbnails }}
            style={{ width: '100%', height: '100%', filter: 'blur' }}
            blurRadius={3}
          >
            <Header
              transparent
              androidStatusBarColor="#d1d1d1"
              toolbarDefaultBorder="#ffffff"
              style={{ zIndex: 1000 }}
            >
              <Left>
                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                  <Icon style={{ color: "#fff", fontSize: 25 }} name='chevron-thin-left' type='Entypo' />
                </TouchableOpacity>
              </Left>
              <Body>
                <Title>{this.state.data.movies[0].title.split(' Sub')[0].replace('Nonton ', '')}</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Icon onPress={() => this.props.navigation.navigate('Search')} style={{ color: "#fff", fontSize: 25 }} name='search' type="Feather" />
                </Button>
              </Right>
            </Header>
            <Content>
              <View>
                <Body>
                  <Image backgroundColor='#000' source={{ uri: this.state.data.movies[0].thumbnails }} style={{ width: 218, height: 323, }} />
                  <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 10 }}>{this.state.data.movies[0].title.split(' Sub')[0].replace('Nonton ', '')}</Text>
                  <Text style={{ color: '#fff', marginTop: 10 }}>{this.state.data.movies[0].genre.split(',')[0]} |  {this.state.data.movies[0].genre.split(',').filter(genre => genre != this.state.data.movies[0].genre.split(',')[0]) + ','}  | {this.state.data.movies[0].rating}</Text>
                </Body>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Button
                  onPress={() => this.handleShare(this.state.data.movies[0].title.split(' Sub')[0].replace('Nonton ', ''), this.state.data.movies[0].slug)}
                  style={{ borderRadius: 10, shadowColor: 'none', marginLeft: 20, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <Icon name="share" />
                </Button>

                <Button
                  onPress={() =>
                    this.props.navigation.navigate("PlayMovie", {
                      title: this.state.data.movies[0].title,
                      embed_url: this.state.data.movies[0].embed_url
                    })
                  }
                  style={{ borderRadius: 10, shadowColor: 'none', marginLeft: 8, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <Icon name="controller-play" type="Entypo" />
                </Button>
                <View style={{ borderBottomWidth: 2, borderBottomColor: '#fff', marginHorizontal: 30, marginVertical: 30 }}></View>
              </View>
            </Content>
          </ImageBackground>
          :
          <ImageBackground
            source={{ uri: this.props.navigation.state.params.thumbnails }}
            style={{ width: '100%', height: '100%', filter: 'blur' }}
            blurRadius={3}
          ><Spinner /></ImageBackground>}
      </Container>
    );
  }
}