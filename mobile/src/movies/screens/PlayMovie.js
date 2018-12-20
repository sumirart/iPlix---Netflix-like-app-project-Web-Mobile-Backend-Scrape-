import React, { Component } from 'react';
import {
    Container, Header, Content, Card, CardItem, Text, Left, Body, Right, Button, Icon, Title, Thumbnail
} from 'native-base';
import { WebView,TouchableOpacity, ActivityIndicator } from 'react-native';
export default class TV extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
        }
    }
    renderLoadingView() {
        return (
            <ActivityIndicator
                color='#bc2b78'
                size="large"
                hidesWhenStopped={true}
            />
        );
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#0e0e0e' }}>
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
                        <Title>{this.props.navigation.state.params.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon onPress={() => this.props.navigation.navigate('Search')} style={{ color: "#fff", fontSize: 25 }} name='search' type="Feather" />
                        </Button>
                    </Right>
                </Header>
                
                    <WebView
                        source={{ uri: this.props.navigation.state.params.embed_url }}
                        renderLoading={this.renderLoadingView} startInLoadingState={true}
                        style={{ backgroundColor: "#0e0e0e" }}
                    />

            </Container>
        )
    }
}