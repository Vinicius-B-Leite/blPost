import React, { useCallback, useContext, useState } from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';

import * as S from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Header from '../../components/Header';
import { useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore'
import PostList from '../../components/PostList';
import { AuthContext } from '../../contexts/auth';

let ICON_SIZE = Dimensions.get('screen').height / 22

export default function Home({ navigation }) {

    const [posts, setPosts] = useState([])

    const [loadingRefresh, setLoadingRefresh] = useState(false)
    const [loadingFeed, setLoadingFeed] = useState(false)
    const [lastItem, setLastItem] = useState('')
    const [isEmpityList, setIsEmpityList] = useState(false)


    const { user } = useContext(AuthContext)

    useFocusEffect(
        useCallback(() => {

            let isActive = true


            function getPosts() {
                if (isActive) {
                    firestore().collection('posts')
                        .orderBy('created', 'desc')
                        .limit(5)
                        .get().then((snapshot) => {
                            setPosts([])
                            let postsList = []

                            snapshot.docs.map(i => {
                                postsList.push({
                                    ...i.data(),
                                    id: i.id
                                })
                            })

                            setPosts(postsList)
                            setLastItem(snapshot.docs[snapshot.docs.length - 1])
                            setIsEmpityList(!!snapshot.empty)
                        })
                }
            }

            getPosts()

            return () => {
                isActive = false
            }
        }, [])
    )

    const handleRefreshPosts = async () => {
        setLoadingRefresh(true)
        firestore().collection('posts')
            .orderBy('created', 'desc')
            .limit(5)
            .get().then((snapshot) => {
                setPosts([])
                let postsList = []

                snapshot.docs.map(i => {
                    postsList.push({
                        ...i.data(),
                        id: i.id
                    })
                })

                setPosts(postsList)
                setLastItem(snapshot.docs[snapshot.docs.length - 1])
                setIsEmpityList(false)
            })
        setLoadingRefresh(false)
    }

    const getListPost = async () => {
        if(!isEmpityList){
            setLoadingFeed(true)
            firestore().collection('posts').orderBy('created', 'desc').limit(5).startAfter(lastItem).get()
            .then((snapshot) => {
                const postList = []
                snapshot.docs.map(i => {
                    postList.push({...i.data(), id: i.id})
                })

                setIsEmpityList(!snapshot.empty)
                setLastItem(snapshot.docs[snapshot.docs.length - 1])
                setPosts(oldP => [...oldP, ...postList])
                setLoadingFeed(false)
            })
        }
    }

    return (
        <S.Container>
            <Header />
            <S.ListPost
                data={posts}
                renderItem={({ item }) => (<PostList data={item} userId={user?.uid} />)}
                refreshing={loadingRefresh}
                onRefresh={handleRefreshPosts}
                onEndReached={() => getListPost()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => loadingFeed && <ActivityIndicator size={40} color='#e52246'/>}
            />
            <S.Button activeOpacity={0.8} onPress={() => navigation.navigate('NewPost')}>
                <FontAwesome5 name='pen' size={ICON_SIZE} />
            </S.Button>
        </S.Container>
    );
}