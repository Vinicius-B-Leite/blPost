import { useNavigation } from '@react-navigation/native';
import React from 'react';

import * as S from './styles';

export default function SearchList({data}) {

    const navigation = useNavigation()

    return (
        <S.Container onPress={() => navigation.navigate('PostsUsers', {title: data.nome, userId: data.id})}>
            <S.Name>{data.nome}</S.Name>
        </S.Container>
    );
}