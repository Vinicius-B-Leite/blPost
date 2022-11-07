import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import * as S from './styles'

import firestore from '@react-native-firebase/firestore'
import Feather from 'react-native-vector-icons/Feather'

export default function Search() {

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {

        if (search === '' || !search) {
            console.log('jhk')
            setUsers([])
            return
        }

        const subscriber = firestore().collection('users')
            .where('nome', '>=', search)
            .where('nome',  '<=', search + '~')
            .onSnapshot((snapshot) => {
                const listUsers = []
                snapshot.forEach((doc) => {
                    listUsers.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                console.log(listUsers)
            })

    

    }, [search])

    return (
        <S.Container>
            <S.AreaInput>
                <Feather size={20} name='search' color='#e32446' />
                <S.Input
                    placeholder='Procurando alguém'
                    value={search}
                    onChangeText={setSearch}
                    placeholderTextColor='#353840' />
            </S.AreaInput>
            <S.List />
        </S.Container>
    );
}