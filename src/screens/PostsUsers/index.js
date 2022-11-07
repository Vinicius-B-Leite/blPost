import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import firestore from '@react-native-firebase/firestore'

import { AuthContext } from '../../contexts/auth'
import PostList from '../../components/PostList';

import * as S from './styles'

export default function PostsUsers({ navigation }) {

  const { params } = useRoute()
  const { user } = useContext(AuthContext)

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.title || 'anônimo'
    })
  }, [params])

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      firestore().collection('posts').where('userId', '==', params.userId)
        .orderBy('created', 'desc').get().then((snapshot) => {
          const list = []
          snapshot.docs.map((post) => {
            list.push({
              ...post.data(),
              id: post.id
            })
          })

          if (isActive) {
            setPosts(list)
            setLoading(false)
          }
        })

      return () => isActive = false
    }, [])
  )


  return (
    <S.Container>
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center ' }}>
            <ActivityIndicator size={50} color='#e52246' />
          </View>)
          :
          <S.ListPosts
            data={posts}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <PostList data={item} userId={user.uid} />}
          />
      }

    </S.Container>
  );
}