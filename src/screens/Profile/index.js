import React, { useContext, useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'

import Feather from 'react-native-vector-icons/Feather'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import * as S from './styles'

export default function Profile() {

  const { singOut, user, setUser, storageUser } = useContext(AuthContext)

  const [url, setUrl] = useState('https://www.showmetech.com.br/wp-content/uploads//2021/02/capa-dog-1920x1024.jpg')
  const [modalVisible, setModalVisible] = useState(false)

  const [name, setName] = useState('')

  useEffect(() => {
    (async () => {
      try {
          let response = await storage().ref('users').child(user.uid).getDownloadURL()
          setUrl(response)
      } catch (error) {
          console.log(error)
      }
    })()
  }, [])

  const handleSingOut = async () => {
    await singOut()
  }

  const updateName = async () => {
    if (name) {
      await firestore().collection('users').doc(user.uid).update({ nome: name })

      const postsDoc = await firestore().collection('posts').where('userId', '==', user.uid).get()

      postsDoc.forEach(async (doc) => {
        await firestore().collection('posts')
          .doc(doc.id).update({ autor: name })
      })

      let data = {
        uid: user.uid,
        nome: name,
        email: user.email
      }

      setUser(data)
      storageUser(data)
      setModalVisible(false)
    }
  }

  const uploadAvatar = async () => {
    const opt = {
      noData: true,
      mediaType: 'photo'
    }
    launchImageLibrary(opt, response => {
      if (response.didCancel) console.log('cancelou')
      else if (response.error) console.log(response.error)
      else {
          uploadAvatarToFirebase(response).then(() => {
            uploadAvatarPosts()
          })

          setUrl(response.assets[0].uri)
      }
    })
  }

  const uploadAvatarToFirebase = async (response) => {
      console.log('entrou')
      const fileSource = response.assets[0].uri
      const storageRef = storage().ref('users').child(user?.uid)

      return await storageRef.putFile(fileSource)
  }

  const uploadAvatarPosts = async () => {

    const storageRef = storage().ref('users').child(user.uid)

    const url = await storageRef.getDownloadURL().then(async (image) => {

      const posts = await firestore().collection('posts').where('userId', '==', user.uid).get()

      posts.forEach(async(doc) => {
        await firestore().collection('posts').doc(doc.id).update({avatarUrl: image})
      })
    })
  }

  return (
    <S.Container>
      <Header />

      {url ? (
        <S.UploadButton onPress={() => uploadAvatar()}>
          <S.UploadText>+</S.UploadText>
          <S.Avatar
            source={{ uri: url }}
          />
        </S.UploadButton>)
        :
        <S.UploadButton onPress={() => uploadAvatar()}>
          <S.UploadText>+</S.UploadText>
        </S.UploadButton>
      }

      <S.Name>{user?.nome}</S.Name>
      <S.Email>{user?.email}</S.Email>

      <S.Button bg='#428cfd' onPress={() => setModalVisible(true)}>
        <S.ButtonText color='#fff'>Atualizar perfil</S.ButtonText>
      </S.Button>


      <S.Button bg='#ddd' onPress={handleSingOut}>
        <S.ButtonText color='#353840'>Sair</S.ButtonText>
      </S.Button>

      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent
      >
        <S.MovalContainer>
          <S.ButtonBack onPress={() => setModalVisible(false)}>
            <Feather name='arrow-left' size={20} color='#121212' />
            <S.ButtonText color='#121212'>Voltar</S.ButtonText>
          </S.ButtonBack>

          <S.Input
            placeholder={user?.nome}
            value={name}
            onChangeText={setName}
            placeholderTextColor='#808080'
          />

          <S.Button bg='#ddd' onPress={() => updateName()}>
            <S.ButtonText color='#353840'>Salvar</S.ButtonText>
          </S.Button>
        </S.MovalContainer>
      </Modal>
    </S.Container>
  );
}