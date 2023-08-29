import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from "react"
import ColorCode from "../../constant/Styles";
import SelectImage from "../../components/selectImage";
import { checkMultiple, Permission, PERMISSIONS, requestMultiple } from "react-native-permissions";
import { useSelector } from "react-redux";
const Profile = () => {

    const [picker, openPicker] = React.useState(false)
    const {selectedImage } = useSelector<any, any>((store) => store.sliceReducer);
console.log(selectedImage,"selectedImage=====>")
    useEffect(() => {
        if (Platform.OS === "ios") {
            checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.CONTACTS]).then((statuses) => {
                console.log("check====Camera--1--Ios---->", statuses[PERMISSIONS.IOS.CAMERA]);
                console.log("check====Microphone-----Ios---->", statuses[PERMISSIONS.IOS.CONTACTS]);

            });
            requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.CONTACTS]).then((statuses) => {
                console.log("request===CamCamera--2--Ios---->", statuses[PERMISSIONS.IOS.CAMERA]);
                console.log("request===MicrophoneIos---->", statuses[PERMISSIONS.IOS.CONTACTS]);

            });
        } else {
            checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.READ_CONTACTS,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
            ]).then((statuses) => {
                console.log("Camera--3--", statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
                console.log("READ_CONTACTS", statuses[PERMISSIONS.ANDROID.READ_CONTACTS]);

            });
            requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.READ_CONTACTS,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            ]).then((statuses) => {
                console.log("Camera--4--", statuses[PERMISSIONS.ANDROID.CAMERA]);
                console.log("AUDIO_RECORDING===>", statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);

            });
        }
    }, [])
    return (

        <ScrollView style={{ flexGrow: 1 }}
            automaticallyAdjustKeyboardInsets={true}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode='interactive'>

            {picker && <SelectImage close={() => { openPicker(false) }} />}
            <TouchableOpacity onPress={() => { openPicker(true) }}
                style={{ backgroundColor: 'white', padding: 5, borderRadius: 100, width: 200, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 200, marginTop: 30 }}>
                 {selectedImage?.uri &&
                    <Image source={selectedImage?.uri} style={{ width: 200, height: 200, borderRadius: 100 }} />
                 }
                <TouchableOpacity onPress={() => { openPicker(true) }} style={{
                    height: 40, width: 45, backgroundColor: 'white', position: 'absolute', bottom: 10, right: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                    elevation: 5, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.4,
                }}>

                </TouchableOpacity>
            </TouchableOpacity>



<Text style={{fontSize:16,marginTop:20,textAlign:'center',color:'black',}}>Please select your image</Text>

        </ScrollView>
    )

}



const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: ColorCode.background_Color
    },
    mainViewStyle: {
        paddingLeft: '8%',
        paddingRight: '8%'
    },
    textStyle: {
        color: ColorCode.gray_color,
        fontWeight: '500',
        fontSize: 15,
        marginTop: hp("1.5%")
    },
    textInpurViewStyle: {
        backgroundColor: ColorCode.white_Color,
        borderWidth: 1,
        borderColor: ColorCode.borderColorSocailButton,
        borderRadius: 5,


    },
    textViewStyle: {
        backgroundColor: ColorCode.textBackgroundColor,
        borderRadius: 5,
    },
    textInputStyle: {
        fontWeight: '700',
        fontSize: 13,
        color: ColorCode.black_Color,
        padding: "2%",
        height: 38
    },
    textStyle1: {
        color: ColorCode.gray_color,
        fontSize: 12,
        fontFamily: 'Poppins',
        padding: "4%"
    },
    UpdateProfileButton: {
        borderRadius: 5,
        backgroundColor: ColorCode.blue_Button_Color,
        marginTop: hp("6%"),
        padding: "3%"
    },
    buttonTextStyle: {
        color: ColorCode.white_Color,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: hp("2%"),
    },
});

export default Profile;