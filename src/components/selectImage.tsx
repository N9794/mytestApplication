import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ColorCode from '../constant/Styles';
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setSelectedImage } from '../redux/reducer';

function SelectImage(props): JSX.Element {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    console.log(props, "props=====>")

    const handleChooseCamera = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };


        //  launchCamera(options?, callback);

        //   // You can also use as a promise without 'callback':
        //   const result = await launchCamera(options?);

        launchCamera(options, (response) => {
            console.log(response, "response======>")
            if (response?.didCancel) {
                props.close()
                console.log('User cancelled image picker');
            } else if (response?.error) {
                console.log('ImagePicker Error: ', response?.error);
            } else if (response?.customButton) {
                console.log('User tapped custom button: ', response?.customButton);
            } else {
                const source = { uri: response?.assets[0] };
                dispatch(setSelectedImage(source));
                props.close()
            }
        });


    };

    const handleChooseGallery = () => {

        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        //  launchCamera(options?, callback);

        //   // You can also use as a promise without 'callback':
        //   const result = await launchCamera(options?);

        launchImageLibrary(options, (response) => {
            console.log(response.assets, "response======>")
            if (response?.didCancel) {
                props.close()
                console.log('User cancelled image picker');
            } else if (response?.error) {
                console.log('ImagePicker Error: ', response?.error);
            } else if (response?.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response?.assets[0] };
                dispatch(setSelectedImage(source));
                props.close()
            }

        });


    };

    return (
        <Modal
            transparent>
            <TouchableOpacity onPress={() => { props.close() }} activeOpacity={1}
                style={{ flex: 1, backgroundColor: ColorCode.modalBgColor, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: '25%', width: '80%', backgroundColor: '#E8E6E6', elevation: 10, borderRadius: 4, }}>
                    <View style={{ height: 50, backgroundColor: ColorCode.blue_Button_Color, borderTopEndRadius: 5, borderTopLeftRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Select Picker</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 30 }}>
                        <TouchableOpacity onPress={() => { handleChooseCamera() }}
                            style={{ height: 70, width: 70, backgroundColor: ColorCode.blue_Button_Color, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                            
                            <Text style={{ color: 'white' }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleChooseGallery() }}
                            style={{ height: 70, width: 70, backgroundColor: ColorCode.blue_Button_Color, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                            
                            <Text style={{ color: 'white' }}>Gallery</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        height: '8%',
        backgroundColor: '#F5F5F5',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

export default SelectImage;
