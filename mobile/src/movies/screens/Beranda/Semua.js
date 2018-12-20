import React, { Component } from 'react';
import axios from 'axios'
import {
  Container, Content, Card, CardItem, Text, Left, Body, Right, Button, Icon, Title, Thumbnail
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

      <View style={styles.listMovies}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("MovieInfo", {
              id: item.id,
              thumbnails: item.thumbnails
            })
          }>
          <Image
            source={{ uri: item.thumbnails }}
            style={{ width: 100, height: 135 }}
          />
        </TouchableOpacity>

          <Text numberOfLines={1} style={{ fontSize: 10, }}>{item.title.split(' Sub')[0].replace('Nonton', '')}</Text>
      </View>

    )
  }
  render() {
    return (
      <ParallaxScrollView
        backgroundColor="#000"
        contentBackgroundColor="#0e0e0e"
        fadeOutForeground={true}
        outputScaleValue={20}
        parallaxHeaderHeight={300}
        renderForeground={() => (
          <ImageSlider
            autoPlayWithInterval={3000}
            loop={true}
            images={[
              'http://digitalspyuk.cdnds.net/12/31/980x490/landscape_movies_looper_poster_1.jpg',
              'https://infinityreads03.files.wordpress.com/2014/04/divergent-movie-poster-wallpaper-1920x1200.jpg?w=797&h=356',
              'https://d2kektcjb0ajja.cloudfront.net/images/posts/feature_images/000/000/072/large-1466557422-feature.jpg?1466557422'

            ]} />
        )}>
        <View>
          <View>
            <Text style={{ marginTop: -80, marginLeft: 8, marginBottom: 8, color: '#fff', fontSize: 13 }}>Rekomendasi Untukmu</Text>
            {this.state.data !== null ?
              <FlatList
                data={this.state.data.data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={this.renderSepactator}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={100}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
              /> : <ActivityIndicator size="large" color="#00ff00" />}
            <Text style={{ marginLeft: 8, marginBottom: 8, marginTop: 10, fontSize: 13, color: '#fff' }}>Film Terpopuler</Text>
            {this.state.data !== null ?
              <FlatList
                data={this.state.data.data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={this.renderSepactator}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={100}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
              /> : <ActivityIndicator size="large" color="#00ff00" />}
            <Text style={{ marginLeft: 8, marginBottom: 8, marginTop: 10, fontSize: 13, color: '#fff' }}>Box Office</Text>
            {this.state.data !== null ?
              <FlatList
                data={this.state.data.data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={this.renderSepactator}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={100}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
              /> : <ActivityIndicator size="large" color="#00ff00" />}
            <Text style={{ marginLeft: 8, marginBottom: 8, marginTop: 10, fontSize: 13, color: '#fff' }}>Tv Series</Text>
            {this.state.data !== null ?
              <FlatList
                data={this.state.data.data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={this.renderSepactator}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={100}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
              /> : <ActivityIndicator size="large" color="#00ff00" />}
            <Text style={{ marginLeft: 8, marginBottom: 8, marginTop: 10, fontSize: 13, color: '#fff' }}>Anime</Text>
            {this.state.data !== null ?
              <FlatList
                data={this.state.data.data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={this.renderSepactator}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={100}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
              /> : <ActivityIndicator size="large" color="#00ff00" />}
          </View>

        </View>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 5,
    minHeight: 100,
  },

  listMovies: {
    width: 100,
    height: 150,
    backgroundColor: '#fff',
    marginLeft: 8
  }
});