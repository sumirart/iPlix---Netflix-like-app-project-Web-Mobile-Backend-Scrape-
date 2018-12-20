import React, { Component } from 'react';
import {
  Container, Header, Content, Card, CardItem, Text, Left, Body, Right, Button, Icon, Title, Thumbnail, Form, Item, Input, Spinner, ListItem
} from 'native-base';
import { TouchableOpacity, View, FlatList } from 'react-native'
import axios from 'axios'

export default class TvSeries extends Component {
  constructor() {
    super();
    this.state = {
      search: null,
      searchTmp: null,
      data: null,
      loading: false
    }
  }

  makeRemoteRequest = () => {
    const url = 'http://192.168.0.62:3333/movies?search=' + this.state.searchTmp
    this.setState({ loading: true })
    axios.get(url)
      .then(async res => {
        await this.setState({
          data: res.data,
          loading: false,
          search: this.state.searchTmp
        })

      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false })
      });
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("MovieInfo", {
            id: item.id,
            thumbnails: item.thumbnails
          })
        }
      >
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: item.thumbnails }} />
          </Left>
          <Body>
            <Text numberOfLines={1} style={{ color: '#fff' }}>{item.title.split(' Sub')[0].replace('Nonton ', '')}</Text>
            <Text note numberOfLines={1}>{item.description}</Text>
          </Body>
        </ListItem>
      </TouchableOpacity>
    )
  }

  handleSearch = () => {
    this.makeRemoteRequest()
    this.setState({
      loading: true
    })

  }


  render() {
    return (
      <Container style={{ backgroundColor: '#0e0e0e' }}>
        <Header searchBar rounded style={{ backgroundColor: '#0e0e0e' }} androidStatusBarColor="#0e0e0e">
          <Item>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name='chevron-thin-left' type='Entypo' />
            </TouchableOpacity>
            <Input
              placeholder="Cari Film"
              onChangeText={(text) => this.setState({ searchTmp: text })} />
            <TouchableOpacity onPress={() => this.handleSearch()}>
              <Icon name="ios-search" />
            </TouchableOpacity>
          </Item>

        </Header>
        <Content>
          {this.state.loading == true ? <Spinner size="large" color="#00ff00" /> : null}

          {this.state.data !== null ?
            this.state.data.total == 0 ?
              <Text style={{ color: '#fff', marginLeft: 15, marginTop: 50, textAlign: "center" }}>Film tidak ditemukan</Text> :
              <FlatList
                data={this.state.data.data}
                showsHorizontalScrollIndicator={false}
                onEndReachedThreshold={100}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem} /> 
           : null}


        </Content>
      </Container >
    );
  }
}
