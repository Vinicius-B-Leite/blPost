import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';

import * as S from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Header from '../../components/Header';



let ICON_SIZE = Dimensions.get('screen').height / 22

export default function Home({navigation}) {

    const [posts, setPosts] = useState([{id: '1'}, {id: '2'}, {id: '3'}])

    return (
        <S.Container>
            <Header/>
            <S.ListPost
                data={posts}
                renderItem={({item}) => (<Text style={{color: '#000'}}>{item.id}</Text>)}
            />
            <S.Button activeOpacity={0.8} onPress={() => navigation.navigate('NewPost')}>
                <FontAwesome5 name='pen' size={ICON_SIZE}/>
            </S.Button>
        </S.Container>
  );
}