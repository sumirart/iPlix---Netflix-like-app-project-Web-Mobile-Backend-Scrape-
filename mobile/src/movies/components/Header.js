import React, { Component } from 'react';
import { Header,Body, Right, Button, Icon,Text,Thumbnail } from 'native-base';
import { withNavigation } from 'react-navigation';

class Headermovie extends Component {
    render() {
        return (
            <Header style={{ backgroundColor: "#0e0e0e" }} androidStatusBarColor="#0e0e0e">
                <Body>
                    <Thumbnail square small source={{uri:'https://fontmeme.com/permalink/181218/ee8f475c180be9f61ff15b7e52e3225e.png'}}
                        style={{height:'100%',width:'70%'}}/>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.props.navigation.navigate('Search')}>
                        <Icon style={{color:"white",fontSize:25}} name='search' type="Feather" />

                    </Button>
                </Right>
            </Header>
            
        );
    }
}
export default withNavigation(Headermovie);