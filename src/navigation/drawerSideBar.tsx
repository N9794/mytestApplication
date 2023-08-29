import { useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setButton, setLoading, setNavigationType, } from '../redux/reducer';
import { setUserDetails } from '../redux/cookiesReducer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { calendar, list, setting2 } from '../utils/imageConst';
import ColorCode from '../constant/Styles';
function DrawerSideBar(props): JSX.Element {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch();
    const d = useDrawerStatus()
    const myData = useSelector<any, any>((state) => state?.cookies?.userDetails,);
    // console.log(myData?.data?.access_type,"user_type===>", myData?.data?.user_access.plan_type)
    const { navigationType, button } = useSelector<any, any>((store) => store.sliceReducer);
    const menuData =
        [{
            navOptionThumb: require('../assets/images/element-3.png'), screenToNavigate: 'Home', name: 'Home',
            access: ["USER_WITH_PBX",
                "USER_WITH_ALL_SERVICES",
                "USER_WITH_VIDEO",
                "MEMBER_WITH_PBX",
                "MEMBER_WITH_ALL_SERVICES"]
        },
        {
            navOptionThumb: require('../assets/images/dvideo.png'), screenToNavigate: 'MeetingsList', name: 'Video',
            access: ["USER_WITH_VIDEO", "USER_WITH_ALL_SERVICES", "MEMBER_WITH_ALL_SERVICES"]
        },
        {
            navOptionThumb: require('../assets/images/callnew.png'), screenToNavigate: 'Call', name: "Call",
            access: [
                "USER_WITH_ALL_SERVICES",
                "MEMBER_WITH_ALL_SERVICES",
                "USER_WITH_PBX",
                "MEMBER_WITH_PBX",
            ]
        },
        {
            navOptionThumb: require('../assets/images/messagenew.png'), screenToNavigate: 'Messaging', name: 'Chat',
            access: [
                "USER_WITH_ALL_SERVICES",
                "MEMBER_WITH_ALL_SERVICES",
                "USER_WITH_PBX",
                "MEMBER_WITH_PBX",
            ]
        },
        {
            navOptionThumb: require('../assets/images/people.png'), screenToNavigate: 'Members', name: "Members",
            access: [
                "USER_WITH_PBX",
                "USER_WITH_ALL_SERVICES",
                "MEMBER_WITH_ALL_SERVICES",
                "MEMBER_WITH_PBX",
            ]
        },
        // {
        //     navOptionThumb: require("../assets/images/calendar.png"), screenToNavigate: 'Calender', name: 'Calender',
        //     access: [
        //         "USER_WITH_PBX",
        //         "USER_WITH_ALL_SERVICES",
        //         "USER_WITH_VIDEO",
        //         "MEMBER_WITH_ALL_SERVICES",
        //         "MEMBER_WITH_PBX",]

        // },

       
        {
            navOptionThumb: require('../assets/images/settingDrawer.png'), screenToNavigate: 'Settings', name: 'Settings',
            access: ["USER_WITH_PBX",
                "USER_WITH_ALL_SERVICES",
                "USER_WITH_VIDEO",
                "MEMBER_WITH_PBX",
                "MEMBER_WITH_ALL_SERVICES"]
        },

        
        {
            navOptionThumb: list, screenToNavigate: 'VirtualNumber', name: 'Virtual\nNumber',
            access: ["USER_WITH_ALL_SERVICES", "USER_WITH_PBX"]
        },

        {
            navOptionThumb:require('../assets/images/gift.png'),screenToNavigate: 'SendGiftCredits', name: 'Send Gift',
            access:["USER_WITH_ALL_SERVICES"] 
          },

        ]


    useEffect(() => {
        dispatch(setNavigationType('Home'))
    }, [])

    const logout = () => {
        dispatch(setUserDetails(""));
        dispatch(setLoading(false))
        //  navigation.navigate("SocailAuth")
        navigation.reset({
            index: 0,
            routes: [{ name: 'SocailAuth' }] // Replace 'Home' with the screen you want to reset to
        });
    }
    const selectDrawerItems = (item) => {
        dispatch(setNavigationType(item))
        navigation.navigate(item)

    }

    const renderDrawerItem = ({ item, index }) => {
        const a =  item?.access.find(data=>data === myData?.data?.access_type)
        // console.log(a,"a==========>")
        return (
            a&&
            <TouchableOpacity
                onPress={() => { selectDrawerItems(item.screenToNavigate) }}
                style={{ height: 55, width: 55, backgroundColor: item.screenToNavigate === navigationType ? '#012B73' : 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10, }}
            >
                <Image
                    style={{ height: 30, width: 35, tintColor: item.screenToNavigate === navigationType ? 'white' : '#012B73', }}
                    source={item.navOptionThumb} />

                <Text numberOfLines={2} style={{
                    fontSize: 10, fontWeight: 'bold',
                    lineHeight: 12, color: item.screenToNavigate === navigationType ? 'white' :
                        '#012B73', marginTop: 2
                }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.sectionContainer}>
            {
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    marginLeft: 18, marginTop: Platform.OS === 'ios' ? 10 : -10
                }}
                    activeOpacity={1} onPress={() => { props.navigation.closeDrawer() }} >
                    <Image
                        source={require('../assets/images/AppIcon.png')}
                        style={{ height: 55, width: 55, backgroundColor: 'white', marginTop: 30, }} />
                    {
                        d == "open" ?
                            <View style={{
                                height: 30, width: 30, backgroundColor: 'white',
                                borderRadius: 15, borderWidth: 1, borderColor: '#012B73', alignItems: 'center',
                                justifyContent: 'center', borderStyle: 'dashed', marginTop: 10
                            }}>
                                <Image
                                    source={require('../assets/images/arrow.png')}
                                    style={{ height: 20, left: -1, width: 20 }} />
                            </View> : ""
                    }

                </TouchableOpacity>
            }
            <View style={{ height: hp('95'), justifyContent: 'space-between', marginTop: 10, }}>
                <FlatList
                    scrollEnabled={false}
                    data={menuData}
                    renderItem={(item) => renderDrawerItem(item)}
                    keyExtractor={(_, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={{ height: 30 }}></View>} />
            </View>
            {/* <View style={{ height: hp('25'), alignItems: 'center', justifyContent: 'space-between', marginTop: Platform.OS === 'android' ? hp('2.0') : hp('0') }}>
                <TouchableOpacity style={{}} onPress={() => { logout() }}>
                    <Image
                        style={{ height: 35, width: 35, }}
                        source={require('../assets/images/Group.png')} />
                </TouchableOpacity>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        height: '100%',
        backgroundColor: ColorCode.white_Color,
        padding: 10,
        alignItems: 'center',

    },
    sectionOne: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    sectionTwo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '20%',
        alignItems: 'center',

    },

});

export default DrawerSideBar;
