import React, { useContext, useState } from 'react';
import { ActivityIndicator, Text, ToastAndroid } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import * as S from './styles';


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [login, setLogin] = useState(true)

    const { singUp, singIn, loadingAuth, loadingLogin } = useContext(AuthContext)

    const hadleNavigation = () => {
        setLogin(!login)
        setEmail('')
        setPassword('')
        setName('')
    }

    const handleLogin = async () => {
        if (!email || !password) {
            ToastAndroid.show('Erro', 2000)
            return
        }
        await singIn(email, password)
    }

    const handleSingUp = async() => {
        if (!email || !password || !name) {
            ToastAndroid.show('Erro', 2000)
            return
        }
        await singUp(email, password, name)
    }

    if (login) {
        return (
            <S.Container>
                <S.Title>BL<Text style={{ color: 'red' }}>Post</Text></S.Title>

                <S.Input value={email} onChangeText={setEmail} placeholder='exemplo@exemplo.com' />
                <S.Input value={password} onChangeText={setPassword} placeholder='**********' />

                <S.Button onPress={handleLogin}>
                    <S.TxtButton>{loadingAuth ? <ActivityIndicator size={24} color='#fff'/> : 'Login'}</S.TxtButton>
                </S.Button>

                <S.SingUpButton onPress={hadleNavigation}>
                    <S.SingUpButtonText>Cadastrar</S.SingUpButtonText>
                </S.SingUpButton>
            </S.Container>
        );
    }
    return (
        <S.Container>
            <S.Title>BL<Text style={{ color: 'red' }}>Post</Text></S.Title>

            <S.Input value={name} onChangeText={setName} placeholder='Nome' />
            <S.Input value={email} onChangeText={setEmail} placeholder='exemplo@exemplo.com' />
            <S.Input value={password} onChangeText={setPassword} placeholder='**********' />

            <S.Button onPress={handleSingUp}>
                <S.TxtButton>{loadingAuth ? <ActivityIndicator size={24} color='#fff'/> : 'Cadastrar'}</S.TxtButton>
            </S.Button>

            <S.SingUpButton onPress={hadleNavigation}>
                <S.SingUpButtonText>Fazer login</S.SingUpButtonText>
            </S.SingUpButton>
        </S.Container>
    );
}