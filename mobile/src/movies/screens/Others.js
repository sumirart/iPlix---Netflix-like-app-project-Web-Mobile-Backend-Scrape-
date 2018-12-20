import React, { Component } from 'react';
import {
  Container, Content, Card, CardItem, Text, Left, Body, Right, Button, Icon, Title, Thumbnail, ListItem
} from 'native-base';
import { View } from 'react-native'

export default class Others extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#0e0e0e' }}>
        <Content>
          <View style={{ flex: 1, flexDirection: "row", paddingLeft: 30, paddingTop: 30 }}>
            <View>
              <Icon name="film" type="Feather" style={{ color: '#fff' }} />
            </View>
            <View style={{ marginLeft: 30, paddingTop: 3 }}>
              <Text style={{ color: '#fff' }}>Box Office</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", paddingLeft: 30, paddingTop: 30 }}>
            <View>
              <Icon name="tv" type="FontAwesome" style={{ color: '#fff' }} />
            </View>
            <View style={{ marginLeft: 25, paddingTop: 3 }}>
              <Text style={{ color: '#fff' }}>TV Series</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", paddingLeft: 30, paddingTop: 30 }}>
            <View>
              <Icon name="smiley" type="Octicons" style={{ color: '#fff' }} />
            </View>
            <View style={{ marginLeft: 30, paddingTop: 3 }}>
              <Text style={{ color: '#fff' }}>Anime</Text>
            </View>
          </View>
          <View style={{ borderBottomWidth: 2, marginBottom: 10,borderBottomColor:'#fff',marginHorizontal:20,marginTop:20 }}></View>
          <View style={{ flex: 1, flexDirection: "row", paddingLeft: 30, paddingTop: 10 }}>
            <View>
              <Icon name="help-with-circle" type="Entypo" style={{ color: '#fff' }} />
            </View>
            <View style={{ marginLeft: 30, paddingTop: 3 }}>
              <Text style={{ color: '#fff' }}>Bantuan</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", paddingLeft: 30, paddingTop: 30 }}>
            <View>
              <Icon name="log-out" type="Entypo" style={{ color: '#fff' }} />
            </View>
            <View style={{ marginLeft: 30, paddingTop: 3 }}>
              <Text style={{ color: '#fff' }}>Keluar</Text>
            </View>
          </View>
         
        </Content>
      </Container>
    );
  }
}