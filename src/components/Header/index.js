import React from 'react';
import { Text, View } from 'react-native';

import * as S from './styles'

export default function Header() {
    return (
        <S.Container>
            <S.Title>BL <Text style={{color: '#e52246', fontStyle:'italic'}}>Posts</Text></S.Title>
        </S.Container>
    );
}