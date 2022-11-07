import React, { useContext, useState } from 'react';
import { Modal, View } from 'react-native';

import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'

import Feather from 'react-native-vector-icons/Feather'
import * as S from './styles'

export default function Profile() {

  const { singOut, user } = useContext(AuthContext)

  const [url, setUrl] = useState('https://www.showmetech.com.br/wp-content/uploads//2021/02/capa-dog-1920x1024.jpg')
  const [modalVisible, setModalVisible] = useState(false)

  const handleSingOut = async () => {
    await singOut()
  }

  return (
    <S.Container>
      <Header />

      {url ? (
        <S.UploadButton onPress={() => alert('jkasfhkj')}>
          <S.UploadText>+</S.UploadText>
          <S.Avatar
            source={{ uri: url }}
          />
        </S.UploadButton>)
        :
        <S.UploadButton onPress={() => alert('22222222')}>
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
          <S.ButtonBack>
            <Feather name='arrow-left' size={20} color='#121212' />
            <S.ButtonText color='#121212'>Voltar</S.ButtonText>
          </S.ButtonBack>

          <S.Input
            placeholder='Test nome'
          />

          <S.Button bg='#ddd' onPress={() => {}}>
            <S.ButtonText color='#353840'>Salvar</S.ButtonText>
          </S.Button>
        </S.MovalContainer>
      </Modal>
    </S.Container>
  );
}