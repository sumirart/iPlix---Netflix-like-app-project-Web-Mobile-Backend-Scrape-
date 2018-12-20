import React, {Component} from 'react';
import { 
  Container, Content, Card, CardItem,Text, Left, Body, Right, Button, Icon, Title, Thumbnail 
} from 'native-base';

export default class BoxOffice extends Component {
  render() {
    return (
      <Container style={{backgroundColor:'0e0e0e'}}>
        <Content>
          <Text>Box Office</Text>
        </Content>
      </Container>
    );
  }
}
