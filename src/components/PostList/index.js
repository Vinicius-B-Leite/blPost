import React, { useState } from 'react';
import { View } from 'react-native';

import * as S from './styles'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import  formatDistance  from 'date-fns/formatDistance'
import { ptBR } from 'date-fns/locale'


import firestore from '@react-native-firebase/firestore'





export default function PostList({ data, userId }) {

    const [likePost, setLikePost] = useState(data?.likes)

    

    const formatTimePost = () => {
        const datePost = new Date(data.created.seconds * 1000) 
        return formatDistance(new Date(), datePost, {locale: ptBR})
    }

    const handleLikePost = async () => {
        const docId = `${userId}_${data.id}`
        
        const doc = await firestore().collection('likes').doc(docId).get()
        
        //add like
        if(!doc.exists){
            await firestore().collection('posts').doc(data.id).update({likes: likePost + 1})
            

            await firestore().collection('likes').doc(docId).set({userId, postId:  data.id}).then(() => setLikePost(likePost + 1))
            
            return
        }

        //remove like
        await firestore().collection('posts')
            .doc(data.id).update({
                likes: likePost - 1
            })

        await firestore().collection('likes').doc(docId)
        .delete().then(() => setLikePost(likePost - 1))
    }

    return (
        <S.Container>
            <S.Header>
                <S.Avatar source={data.avatarUrl ? { uri: data?.avatarUrl } : require('../../assets/avatar.png')} />
                <S.Name numberOfLines={1}>{data?.autor}</S.Name>
            </S.Header>

            <S.ContentView>
                <S.Content>{data?.content}</S.Content>
            </S.ContentView>

            <S.Actions>
                <S.LikeButton onPress={() => handleLikePost()}>
                    <S.Like>{likePost > 0 && likePost}</S.Like>
                    <MaterialCommunityIcons name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'} size={20} color='#e52246' />
                </S.LikeButton>

                <S.TimePost> {formatTimePost()}</S.TimePost>
            </S.Actions>
        </S.Container>
    );
}