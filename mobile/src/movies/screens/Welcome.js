import React, { Component } from 'react';
import {
    Container, Content, Header, Text, Left, Body, Right, Button, Icon, Title, Thumbnail, View
} from 'native-base';
import { ImageBackground, StyleSheet, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

const { width: width } = Dimensions.get('window');

class Welcome extends Component {
    static navigationOptions = {
        header: null,
    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#0e0e0e" }} androidStatusBarColor="#0e0e0e">
                    <Body>
                        <Image source={{ uri: 'https://fontmeme.com/permalink/181218/ef64f5b5cda981cf1fed04d965632a08.png' }}
                            resizeMode="cover"
                            style={{ width: 100, height: '100%', maxWidth: '100%' }} />
                    </Body>
                    <Right />
                </Header>

                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={{ uri: 'https://bit.ly/2rHMTYz' }}
                        imageStyle={{ opacity: 0.5 }}
                        style={styles.container}>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ fontSize: 33, color: "white" }}>See what’s next.</Text>
                            <Text style={{ fontSize: 22, color: "white", marginBottom: 5 }}>Watch anywhere cancel anytime.</Text>
                            <Button style={styles.button} onPress={() => this.props.navigation.navigate('First')}>
                                <Text style={{ fontSize: 20 }}>LET'S SIGN IN NOW</Text>
                            </Button>
                        </View>
                    </ImageBackground>
                </View>


            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',//TODO: Importate para que la imagen abarque toda la pantalla
        backgroundColor: '#0e0e0e',
        width: '100%',
        height: '100%'
    },
    contentContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 20,
        overflow: 'visible',
        alignItems: 'center',
        alignSelf: 'stretch',

    },
    button: {
        backgroundColor: "#f40612",
        borderRadius: 5,
        alignSelf: "center",
        textAlign: 'center'
    }
});
export default withNavigation(Welcome);