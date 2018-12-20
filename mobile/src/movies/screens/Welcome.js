import React, { Component } from 'react';
import {
    Container, Content, Header, Text, Left, Body, Right, Button, Icon, Title, Thumbnail, View
} from 'native-base';
import { ImageBackground, StyleSheet, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

const { width: width } = Dimensions.get('window');

class Welcome extends Component {
    static navigationOptions = {
        header:null,
      }

    componentWillMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Semua')
        }, 4000);
    }
  render() {
    return (
            <Container>
                <Header style={{ backgroundColor: "#0e0e0e"}} androidStatusBarColor="#0e0e0e">
                    <Right/>
                </Header>
 
            <View style={{ flex:1,backgroundColor:"#0e0e0e"}}>
                    <View style={{justifyContent: 'center',alignItems: 'center',marginTop:50}}>
                        <Image source={{ uri: 'https://fontmeme.com/permalink/181218/ef64f5b5cda981cf1fed04d965632a08.png' }}
                        resizeMode="contain"
                        style={{ width: 200, height: '45%', maxWidth: '100%' }} />

                        <Text style={{fontSize:35,color:"white"}}>See what’s next</Text>
                        <Text style={{fontSize:25,color:"white",marginTop:5}}>Watch anywhere cancel anytime</Text>
                    </View>
            </View>
               
           
        </Container>
    );
  }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#0e0e0e',
        alignItems: 'center',//TODO: Importate para que la imagen abarque toda la pantalla
        backgroundColor: '#0e0e0e',
        width: '100%',
        height: '100%'
    },
    contentContainer: {
      flex : 1,
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingVertical: 20,
      overflow:'visible',
      alignItems: 'center',
      alignSelf: 'stretch',
      
    },
    button:{
        backgroundColor:"#f40612",
        borderRadius:5,
        alignSelf:"center",
        textAlign:'center',
        marginTop:5 
    }
  });
export default withNavigation(Welcome);