import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from "react"
import ColorCode from "../../constant/Styles";
import { useNavigation } from "@react-navigation/native";
import { Validate, validationParam } from "../../constant/commonFuntions";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLoginUser } from "../../redux/cookiesReducer";
import { Show_Toast } from "../../components/toast";
const SignIn = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<any>({});
    const [showPassword, setShowPassword] = useState(true);

    const navigation = useNavigation<any>()
    const { allUsersDetail } = useSelector<any, any>((store) => store.cookies);
    console.log(allUsersDetail, "allUsersDetail======>11111")
    const loginUser = () => {
        let _error = {};
        const emailError = Validate(validationParam.email, email, 'signUpPage');
        if (emailError !== '') {
            _error = { ..._error, email: emailError };
        }
        const passwordError = Validate(validationParam.password, password, 'signUpPage');
        if (passwordError !== '') {
            _error = { ..._error, password: passwordError };
        }

        setErr(_error ?? {});

        if (email && password) {

            if (allUsersDetail.email === email && allUsersDetail.password === password) {
                const data = { email: email, password: password }
                dispatch(setLoginUser(data))
                Show_Toast("You are logged in successfully")
                setEmail('')
                setPassword('')
                setErr({})
                dispatch(setLogin(true))
                navigation.navigate("DrawerNavigator")
            }else{
                Show_Toast("You are Not application user.")
            }

        }
    }

    return (

        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} showsVerticalScrollIndicator={false}>
            <View style={{ height: hp(100) }}>
                <View style={styles.topViewStyle}>
                    {/* <Image style={styles.logoStyle} source={loginImg} /> */}
                    <Text style={styles.textStyle}>{'Login to Your Account'}</Text>
                </View>
                <View style={[styles.textInpurViewStyle, { marginTop: hp("10%") }]} >
                    <TextInput
                        style={[styles.textInputStyle, {width:'100%', height: Platform.OS === 'ios' ? 40 : 40 }]}
                        placeholder="Email"
                        keyboardType={"email-address"}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor={'#777777'}
                        value={email}
                        autoCapitalize="none"
                    />
                </View>
                {err?.email && <Text style={styles.errorMsg}>{err?.email}</Text>}
                <View style={[styles.textInpurViewStyle, { marginTop: hp("1%"),  alignItems: 'center' }]} >
                    <TextInput
                        style={[styles.textInputStyle, {width:'80%', height: Platform.OS === 'ios' ? 40 : 40 }]}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor={'#777777'}
                        secureTextEntry={showPassword}
                        value={password}
                    />

                    <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                        <Text>{showPassword?'Show':'Hide'}</Text>
                    </TouchableOpacity>
                </View>
                {err?.password && <Text style={styles.errorMsg}>{err?.password}</Text>}
                <TouchableOpacity onPress={() => loginUser()} style={styles.singInButton} >
                    {/* {isLoading ?
                <ActivityIndicator color="white" />
                : */}
                    <Text style={styles.buttonTextStyle}>{"Sign In"}</Text>
                    {/* } */}
                </TouchableOpacity>




                <View style={styles.bottomStyle}>
                    <Text style={[styles.orTextStyle, { color: ColorCode.gray_color }]}>{"Don't have an account?"}</Text>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("SignUp")}
                    >
                        <Text style={[styles.bottomTextStyle, { fontWeight: "bold", color: ColorCode.blue_Button_Color }]}>{"Signup"}</Text>
                    </TouchableOpacity>
                </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingEnd:10,
        width: wp(89),
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
    },
    errorMsg: {
        color: ColorCode.redColor,
        fontSize: 12,
        marginLeft: wp("8%"),
        lineHeight: 15,
        marginTop: -1,
        alignSelf: 'flex-start'
    },
})

export default SignIn;