import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView, Alert, Linking, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { RectButton, } from 'react-native-gesture-handler'
import api from '../../services/api'
import * as MailComposer from 'expo-mail-composer';

interface Params {
    point_id: number;
}

interface Data {
    point: {
        image: string,
        image_url: string,
        nome: string,
        email: string,
        whatsapp: string,
        city: string,
        uf: string
    };
    items: {
        title: string
    }[]
    posts: {
        id: number
        name: string
        text_post: string
        uf: string
        city: string
        image_url: string
    }[]
}

const Detail = () => {


    const [data, setData] = useState<Data>({} as Data);
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params as Params;

    useEffect(() => {
        api.get(`points/${routeParams.point_id}`).then(res => {
            setData(res.data)
        })
    }, [])

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleComposeMail() {
        MailComposer.composeAsync({
            subject: 'Interesse na Coleta de resíduos',
            recipients: [data.point.email]
        })
    }

    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`);
    }

    if (!data.point) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
           <ScrollView>
           <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Image style={styles.pointImage} source={{ uri: data.point.image_url }} />

                <Text style={styles.pointName}>{data.point.nome}</Text>
                <Text style={styles.pointItems}>
                    {data.items.map(item => item.title).join(', ')}
                </Text>
                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
                </View>
                <View>
                    {/* <Text style={styles.pointNamePost}>{data.posts[0].name}</Text>
                    <Text style={styles.pointEnderecoPost}>{data.posts[0].city} - {data.posts[0].uf}</Text>
                    <Image style={styles.pointImagePost} source={{ uri: data.posts[0].image_url }}></Image>
                    <Text  style={styles.pointTextPost}>{data.posts[0].text_post}</Text> */}

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>

                        {
                            data.posts.map(post => (

                                <TouchableOpacity
                                    activeOpacity={0.8} style={styles.item}
                                    onPress={() => { }} key={String(post.id)}>
                                    <Text style={styles.pointNamePost}>{post.name}</Text>
                                    <Text style={styles.pointEnderecoPost}>{post.city} - {post.uf}</Text>
                                    <Image style={styles.pointImagePost} source={{ uri: post.image_url }}></Image>
                                    <Text style={styles.pointTextPost}>{post.text_post}</Text>
                                </TouchableOpacity>
                            ))
                        }

                    </ScrollView>
                </View>
            </View>
           </ScrollView>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Icon name="mail" size={20} color="#fff" />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight:20,
        height:'auto',
        paddingHorizontal: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    pointImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 32,
    },

    pointName: {
        color: '#322153',
        fontSize: 28,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    pointItems: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },

    containerPost: {
        flex: 1,
        marginTop: 16,
        // backgroundColor: '#FFF'
    },

    pointImagePost: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 16,
    },
    pointNamePost: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pointEnderecoPost: {
        width: '100%',
        color: '#6C6C80',
        fontSize: 14,
    },
    pointTextPost: {
        width: '100%',
        fontSize: 15,
        marginTop: 8
    },

    address: {
        marginTop: 32,
    },

    addressTitle: {
        color: '#322153',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },

    addressContent: {
        fontFamily: 'Roboto_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },

    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#999',
        paddingVertical: 20,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width: '48%',
        backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },

    item: {
        backgroundColor: '#fff',
        // borderWidth: 2,
        // borderColor: '#eee',
        minHeight: 120,
        height:'auto',
        width: 300,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 20,
        marginTop:24,
        paddingBottom: 16,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'space-between',

        textAlign: 'center',
    },
});

export default Detail;