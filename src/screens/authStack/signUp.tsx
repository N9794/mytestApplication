import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import ColorCode from "../../constant/Styles";

//Third party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { Validate, validationParam } from "../../constant/commonFuntions";
import { useDispatch } from "react-redux";
import { setAllUserDetail } from "../../redux/cookiesReducer";
import { Show_Toast } from "../../components/toast";
const SignUP = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const phoneInput = useRef<PhoneInput>(null);
    const [formattedValue, setFormattedValue] = useState("");
    const [email, setEmail] = useState("");
    const [resetPassword, setResetPassword] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [err, setErr] = useState<any>({});

    const signUpUser = () => {
        let _error = {};
        const phoneError = Validate(validationParam.phoneNumber, phone, 'signUpPage');
        if (phoneError != '') {
            _error = { ..._error, phoneError: phoneError };
        }
        const emailError = Validate(validationParam.email, email, 'signUpPage');
        if (emailError !== '') {
            _error = { ..._error, email: emailError };
        }
        const passwordError = Validate(validationParam.password, password, 'signUpPage');
        if (passwordError !== '') {
            _error = { ..._error, password: passwordError };
        }
        const resetPasswordError = Validate(validationParam.resetPassword, resetPassword, 'signUpPage');
        if (resetPasswordError !== '') {
            _error = { ..._error, resetPasswordError: resetPasswordError };
        }
        setErr(_error ?? {});
        if (phone && email && password ) {
         const data ={phone: phone, email:email , password :password}
            dispatch(setAllUserDetail(data))
            Show_Toast("You are user now.")
            setResetPassword('')
            setEmail('')
            setPassword('')
            setErr({})
            setPhone('')
        }


       


    }




    return (

        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            showsVerticalScrollIndicator={false}>

            <View style={styles.topViewStyle}>
                <Text style={styles.textStyle}>{'Create New Account'}</Text>
            </View>

            <PhoneInput
                ref={phoneInput}
                defaultValue={phone}
                defaultCode="IN"
                layout="first"
                value={phone}
                maxLength='15'
                onChangeText={(text) => { setPhone(text); }}
                onChangeFormattedText={(text) => { setFormattedValue(text); }}
                keyboardType="phone-pad"
                containerStyle={{
                    width: wp("89%"), borderRadius: 5, borderColor: ColorCode.borderColorSocailButton,
                    borderWidth: 1,
                }}
                textInputStyle={[{ color: ColorCode.black_Color }, { height: 38, left: -20,marginTop:8 }]}
                codeTextStyle={{ color: ColorCode.gray_color, height: hp(3), left: -20,marginTop:5 }}
                textContainerStyle={{ borderRadius: 5, height: 38, width: wp(70), left: -20,
                     backgroundColor: ColorCode.white_Color }}
                textInputProps={{ placeholderTextColor: ColorCode.white_Color }}
                disableArrowIcon />
            {err?.phoneError &&<Text style={styles.errorMsg}>{err?.phoneError}</Text>}


            <View style={[styles.textInpurViewStyle, { marginTop: hp("2%") }]} >
                <TextInput
                    style={styles.textInputStyle}
                     value={email}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    keyboardType={"email-address"}
                    placeholderTextColor={"#777777"}
                    autoCorrect={false}
                    maxLength={26}
                    autoCapitalize="none" />
            </View>
            {err?.email &&<Text style={styles.errorMsg}>{err?.email}</Text>}
            <View style={[styles.textInpurViewStyle, { marginTop: hp("1%") }]} >
                <TextInput
                    style={styles.textInputStyle}
                     value={password}
                    placeholder="Password"
                    onChangeText={(text) => { setPassword(text) }}
                    placeholderTextColor={"#777777"}
                    autoCorrect={false}
                    secureTextEntry={true}
                    autoCapitalize="words"
                    maxLength={16} />
            </View>
            {err?.password &&<Text style={styles.errorMsg}>{err?.password}</Text>}

            <View style={[styles.textInpurViewStyle, { marginTop: hp("1%"),  }]} >
                <TextInput
                    style={[styles.textInputStyle,]}
                     value={resetPassword}
                    placeholder="Confirm  Password"
                    onChangeText={(text) => setResetPassword(text)}
                    placeholderTextColor={"#777777"}
                    autoCorrect={false}
                    
                    secureTextEntry={true}
                    maxLength={16} />
                {/* <PasswordEye /> */}
            </View>
            {err?.resetPasswordError &&<Text style={styles.errorMsg}>{err?.resetPasswordError}</Text>}
            
            <TouchableOpacity onPress={() => signUpUser()} style={styles.singInButton}>
                <Text style={styles.buttonTextStyle}>{"Sign Up"}</Text>
            </TouchableOpacity>

            <View style={styles.bottomStyle}>
                <Text style={[styles.orTextStyle, { color: ColorCode.gray_color }]}>{"Already have an Account?"}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                    <Text style={[styles.bottomTextStyle, { fontWeight: "bold", color: ColorCode.blue_Button_Color }]}>{"Login"}</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )

}



const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: ColorCode.background_Color
    },
    logoStyle: {
        height: hp("16%"),
        width: wp("32%")
    },
    topViewStyle: {
        // marginTop: hp("6%"),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(10),
        marginTop:hp(5)
    },
    textStyle: {
        color: ColorCode.black_Color,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 24,
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
        justifyContent: 'center',
        width: wp(89)
    },
    textInputStyle: {
        fontWeight: '600',
        fontSize: 14,
        color: ColorCode.black_Color,
        height: 40,
        paddingLeft: 10,
    },
    singInButton: {
        borderRadius: 5,
        backgroundColor: ColorCode.blue_Button_Color,
        marginLeft: wp("8%"),
        marginTop: hp("3%"),
        marginRight: wp("8%"),
        padding: "3%",
        width: wp(89)
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
        marginTop: hp("2%")
    },
    bottomTextStyle: {
        color: ColorCode.blue_Button_Color,
        textAlign: 'center',
        fontSize: hp("1.5%"),
        fontWeight: "bold",
        marginHorizontal: wp("1%")
    },
    remenberTextStyle: {
        color: ColorCode.gray_color,
        fontWeight: '500',
        fontSize: hp("1.7%"),
        marginHorizontal: wp("2%")
    },

    checkViewStyle: {
        flexDirection: 'row',
        marginLeft: wp("8%"),
        marginTop: hp("1%"),
        alignItems: "center"
    },
    orTextStyle: {
        color: ColorCode.border_Color,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: hp("1.7%"),
        marginHorizontal: wp("1%")
    },
    errorMsg: {
        color: ColorCode.redColor,
        fontSize: 12,
         marginLeft: wp("8%"),
        lineHeight: 15,
        marginTop: -1,
        alignSelf:'flex-start'
    },

})

export default SignUP;