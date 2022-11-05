import React, { useContext, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import * as S from './styles'
import { AuthContext } from '../../contexts/auth';

export default function NewPost({ navigation }) {

  const [post, setPost] = useState('')

  const { user } = useContext(AuthContext)

  //a diferença entre useEffect e o useLayoutEffect é que o useEffect roda quando
  //a tela é carregada, já o useLayoutEffect, ele roda antes da tela carregar, a 
  //tela espera ele terminar para ser construidda
  useLayoutEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <S.Button onPress={() => handlePost()}>
          <S.ButtonText>Compartilhar</S.ButtonText>
        </S.Button>
      )
    })

  }, [navigation, post])

  const handlePost = async () => {
    if (post) {
      let avatarUrl = null
      try {
        avatarUrl = await storage().ref('users').child(user?.uid).getDownloadURL()
      } catch (error) {
        avatarUrl = null
      }

      await firestore().collection('posts').add({
        created: new Date(),
        content: post,
        autor: user?.nome,
        userId: user?.uid,
        likes: 0,
        avatarUrl
      }).then(() => {
        setPost('')
      })
      navigation.goBack()
    }
  }
  return (
    <S.Container>
      <S.Input
        placeholder='O que está acontecendo?'
        onChangeText={setPost}
        value={post}
        autoCorrect={false}
        multiline={true}
        maxLength={300}
      />
    </S.Container>
  );
}