import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from "react"
import ColorCode from "../../constant/Styles";
import Geolocation from 'react-native-geolocation-service';
import locationsData from "../../constant/helpers";

const NearestUser = () => {


    const [userData, setUSerData]=useState([])
    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position, "position=======>")
                    const { latitude, longitude } = position?.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        });
    };


    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
    };


    const findNearestUsers = async () => {
        try {
            const currentLocation = await getCurrentLocation();
            const { latitude: currentLat, longitude: currentLon } = currentLocation;

            // Calculate distances for all locations
            const locationsWithDistances = locationsData.map((location) => {
                const { lat, long } = location;
                const distance = calculateDistance(currentLat, currentLon, lat, long);
                return { ...location, distance };
            });

            // Sort locations by distance
            locationsWithDistances.sort((a, b) => a.distance - b.distance);

            // Get the 5 nearest users
            const nearestUsers:any = locationsWithDistances.slice(0, 5);
            setUSerData(nearestUsers)
            console.log(nearestUsers, "nearestUsers=======>");
        } catch (error) {
            console.error('Error getting current location:', error);
        }
    };


    useEffect(() => {
        findNearestUsers();
    }, [])


    const renderItem_details = ({item}) => {
      
        return (
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', padding: "4%", borderBottomWidth: 2, borderColor: ColorCode.border_Color }}>

                <Text style={styles.textStyle}>{item?.name}</Text>
                <Text style={styles.textStyle}>{item?.lat}</Text>
                <Text style={styles.textStyle}>{item?.long}</Text>

            </View>
        )
    }


    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <View style={{ height: hp(80),marginTop:200 }}>
            <Text style={styles.textStyle}>Five nearest location to me</Text>
                <FlatList
                    data={userData}
                    renderItem={renderItem_details}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )

}



const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: ColorCode.background_Color
    },
    logoStyle: {
        height: hp("16%"),
        width: wp("32%"),
        borderRadius: 5
    },
    topViewStyle: {
        marginTop: hp("10%"),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: ColorCode.black_Color,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: hp("2.8%"),
        marginTop: hp("2%"),

    },
    textInpurViewStyle: {
        backgroundColor: ColorCode.white_Color,
        borderWidth: 1,
        borderColor: ColorCode.borderColorSocailButton,
        borderRadius: 5,
        // padding: "0.8%",
        marginLeft: wp("8%"),
        marginVertical: hp("1%"),
        marginRight: wp("8%"),
        justifyContent: 'center'
    },
    textInputStyle: {
        fontWeight: '600',
        fontSize: 14,
        color: ColorCode.black_Color,

        paddingLeft: 10,
    },
    singInButton: {
        borderRadius: 5,
        backgroundColor: ColorCode.blue_Button_Color,
        marginLeft: wp("8%"),
        marginVertical: hp("3%"),
        marginRight: wp("8%"),
        padding: "3%"
    },
    buttonTextStyle: {
        color: ColorCode.white_Color,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: hp("2%"),

    },
    bottomStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp("3%")
    },
    bottomTextStyle: {
        color: ColorCode.blue_Button_Color,
        textAlign: 'center',
        fontSize: hp("1.5%"),
        fontWeight: "bold",

    },
    lineStyle: {
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: ColorCode.border_Color,
        width: wp("26%")
    },
    orViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: hp("2.5%")
    },
    orTextStyle: {
        color: ColorCode.border_Color,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: hp("1.7%"),
        marginHorizontal: wp("1%")
    },
    remenberTextStyle: {
        color: ColorCode.black_Color,
        fontWeight: '500',
        fontSize: hp("1.7%"),
        marginHorizontal: wp("2%")
    },
    socialButtonStyle: {
        borderWidth: 1,
        borderColor: ColorCode.borderColorSocailButton,
        marginHorizontal: wp("3%"),
        padding: "6%",
        borderRadius: 5
    },
    socailButtonViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp("3%")

    },
    checkViewStyle: {
        flexDirection: 'row',
        marginLeft: wp("8%"),
        marginTop: hp("1%"),
        alignItems: "center"
    },
    myColormyColor: {
        backgroundColor: 'red'
    }
})

export default NearestUser;