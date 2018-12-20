import React, {Component} from 'react';
import { 
  Thumbnail,Button,Container,Content,Body ,Form, Item, Input,Label 
} from 'native-base';

import { ImageBackground , Text , ActivityIndicator,Dimensions,StyleSheet, View } from 'react-native';
const {width,height} = Dimensions.get('window')

export default class FirstPage extends Component {
    static navigationOptions = {
        header:null,
      }
    render() {
    return (
      <Container>
        <View style={{backgroundColor: 'white', alignItems: "center" }}>
            {/* <StatusBar backgroundColor="#2c3e50" barStyle="light-content"/> */}
            <Thumbnail square small source={{ uri: 'https://blog.eagleprotect.co.nz/hubfs/Eagle_Protect_October2017-theme/Images/eagle-red.png' }}
              style={{ height: 120, width: 300, alignItems: "center", marginTop: 10, alignSelf: "center" }} />
          </View>
        <Content>
        <Form>
            <Item floatingLabel>
            <Label>Username / Email</Label>
              <Input
                underlineColorAndroid='transparent' />
            </Item>
            <Item floatingLabel>
            <Label>Password</Label>
              <Input
                underlineColorAndroid='transparent' />
            </Item>
          </Form>
          <View style={{ flex: 1, flexDirection: "row", paddingTop: 10}}>
            <Button info style={styles.button} >
              <Text style={{ fontSize: 16,color:"white" }}> Login </Text>
            </Button>
            <Button success style={{
              left: 8, height: 50, width: 100, paddingTop: 10, paddingBottom: 5,
              marginBottom: 10, margin: 5, borderRadius: 5, justifyContent: "center"
            }}>
              <Text style={{ fontSize: 16,color:"white" }}> Register </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  button: {
    left:8,
    height:50,
    width:90,
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 10,
    margin:5,
    justifyContent:"center",
    borderRadius: 5,
  },
});
