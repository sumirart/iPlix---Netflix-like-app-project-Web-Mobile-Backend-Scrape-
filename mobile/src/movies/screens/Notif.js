import React, { Component } from 'react';
import axios from 'axios'
import {
  Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Spinner
} from 'native-base';
import { ActivityIndicator, ScrollView, View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import ImageSlider from 'react-native-image-slider';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

export default class Film extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: null,
      pages: 1,
      limit: 10,
      error: null,
      refreshing: false
    }
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }
  makeRemoteRequest = () => {
    const { page, limit } = this.state
    const url = 'http://iplix.herokuapp.com/movies?pages=' + this.state.pages + '&limit=' + this.state.limit
    this.setState({ loading: true })
    axios.get(url)
      .then(async res => {
        await this.setState({
          data: res.data
        })
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false })
      });
  }

  handleRefreshing = () => {
    this.setState({
      page: 1,
      refreshing: true,
      limit: this.state.limit + 1
    }),
      this.makeRemoteRequest()
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.makeRemoteRequest()
    })
  }

  renderItem = ({ item, index }) => {
    return (
      <ListItem thumbnail>
        <Left>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("MovieInfo", {
                id: item.id,
                thumbnails: item.thumbnails
              })
            }
          >
            <Thumbnail square source={{ uri: item.thumbnails }} />
          </TouchableOpacity>
        </Left>
        <Body>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("MovieInfo", {
                id: item.id,
                thumbnails: item.thumbnails
              })
            }
          >
            <Text numberOfLines={1} style={{ color: '#fff' }}>{item.title.split(' Sub')[0].replace('Nonton ', '')}</Text>
            <Text note numberOfLines={1}>{item.description}</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>
    )
  }
  render() {
    return (
      <Container style={{ backgroundColor: '#0e0e0e' }}>
        <Content>
          <Text style={{ marginLeft: 15, marginBottom: 8, marginTop: 10, fontSize: 13, color: '#fff' }}>Notifikasi</Text>

          {this.state.data !== null ?
            <FlatList
              data={this.state.data.data}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={this.renderSepactator}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={100}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
            /> : <Spinner size="large" color="#00ff00" />}
        </Content>
      </Container>
    );
  }
}