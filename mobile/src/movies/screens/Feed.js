import React, { Component } from "react";
import { 
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Icon } from 'native-base';
class Video extends Component {
    render() {
        return <View>
            <Image source={{ uri: "https://ganol.si/wp-content/uploads/2018/11/#0e0e0ekKlansman-2018-BluRay-251x323.jpg" }} style={{ height: 200 }} />

            <ScrollView style={{ marginTop: 15, marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text
                  style={{ fontSize: 18, color: "#202020", flex: 1 }}
                >
                  
                </Text>
                <Icon name="arrow-up" size={27} color="#0e0e0e" style={{ marginLeft: 15 }} />
              </View>

              <Text style={{ marginTop: 5 }}>
                 views
              </Text>

              <View style={{ borderWidth: 1, borderBottomColor: "gray"}}>
                <View style={{ flexDirection: "row", marginHorizontal: 20, marginVertical: 15 }}>

                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Icon name="thumbs-up" size={25} color="#777476" />
                        <Text style={{ marginTop: 5 }}></Text>
                    </View>

                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Icon name="thumbs-down" size={25} color="#777476" />
                        <Text style={{ marginTop: 5 }}></Text>
                    </View>

                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Icon name="thumbs-up" size={25} color="#777476" />
                        <Text style={{ marginTop: 5 }}>Share</Text>
                    </View>

                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Icon name="thumbs-up" size={25} color="#777476" />
                        <Text style={{ marginTop: 5 }}>Download</Text>
                    </View>

                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Icon name="thumbs-up" size={25} color="#777476" />
                        <Text style={{ marginTop: 5 }}>Save</Text>
                    </View>

                </View>
              </View>

              <Text>Channel:</Text>
              <Text>Published on:</Text>
              <Text>Dislike:</Text>
              <Text>Comment:</Text>
              <Text>Description:</Text>
            </ScrollView>
          </View>;
    }
}
export default Video;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});