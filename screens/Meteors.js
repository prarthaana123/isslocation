import React, { Component } from 'react';
import { Text, View, Alert,FlatList,Image,ImageBackround,Dimensions } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=pussTHA4DdnfFTVinguGnUNt1i72b5rwdPf1KmmM")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })

    }

    renderIteam=({iteam})=>{
        let meteor=iteam,
        let bg_image,speed,size.
        if(meteor.threat_score<=30){
            bg_image=require('../assets/meteor_bg1.png')
            speed=require('../assets/meteor_speed3.gif.png')
            size=100
        }
        else if (meteor.threat_score<=75){
            bg_image=require('../assets/meteor_bg2.png')
            speed=require('../assets/meteor_speed3.gif')
            size=150
        }

        else{
            bg_image=require('../assets/meteor_bg3.png')
            speed=require('../assets/meteor_speed3.gif')
            size=200
        }

        return(
        <View>
        <ImageBackround  source={bg_image} style={styles.backgroundImage}>
               <View style={styles.gifContainer}>
           <Image source={speed}style={{width:size,height:size,alignSelf:'center'}}>
           </Image>
           <View>
           <Text style={[styles.cardTtitle,{imageTop:400,marginLeft:50}]}>{iteam.Name}</Text>
           <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>Closest to Earth - {item.close_approach_data[0].close_approach_date_full}</Text>
           <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>minimum diameter(kilometers) - {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
           <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>maximum diameter(kilometers) - {item.estimated_diameter.kilometers.estimated_diameter_max</Text>
           <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>velocity (KM/H) - {item.close_approach_data[0].realtive_velocity.{kilometers_per_hour}/Text>
           <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>missing Earth/(KM) - {item.close_approach_data[0].miss_distance.kilometers}</Text>
        </View>
           </View>
           </ImageBackround>
           </View>
        )
    }


    keyExtracter=(iteam,index=>index.tostring)


    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([], meteor_arr);

            meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore;
            });

            meteors.sort function(a,b){
              return(
                  b.threat_score-a.threat_score
              )
              meteors.slice(0,5);

            }



            return (
                <View
                    style={styles.contanier}>
                       <FlatList
                        keyExtracter={this.keyExtracter}
                        data={meteors}
                        renderIteam={this.renderIteam}
                        horizontal={true}/>
                </View>
            )
        }
    }
}

const styles=StyleSheet.create({
    contanier:{
        flex:1
    },
    droidSafeArea:{
        marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
    },

    backgroundImage:{
    flex:1,
    resizeMode:'cover',
    width:Dimensions.get('window'),
    height:Dimensions.get('window')
    },

    titleBar:{
        flex:0.15,
        alignItems:'center',
        justifyContent:'center'
    },

    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    meteorContainer: {
        flex: 0.85
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white"
    },
    cardText: {
        color: "white"
    },
    threatDetector: {
        height: 10,
        marginBottom: 10
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    meteorDataContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
});


})




