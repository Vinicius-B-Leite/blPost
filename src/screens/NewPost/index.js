import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';

import * as S from './styles'

export default function NewPost({navigation}) {

  const [post, setPost] = useState('')

  //a diferença entre useEffect e o useLayoutEffect é que o useEffect roda quando
  //a tela é carregada, já o useLayoutEffect, ele roda antes da tela carregar, a 
  //tela espera ele terminar para ser construidda
  useLayoutEffect(()=>{

    navigation.setOptions({
      headerRight: () => (
        <S.Button>
          <S.ButtonText>Compartilhar</S.ButtonText>
        </S.Button>
      )
    })

  }, [navigation, post])

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