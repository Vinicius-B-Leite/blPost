import React, { createContext, useEffect, useState } from "react";

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({})

export default function AuthContextProvider({children}){

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loadingLogin, setLoadingLogin] = useState(true)

    useEffect(()=>{

        const getUser = async () => {
            let storage = await AsyncStorage.getItem('_user')

            if (storage) setUser(JSON.parse(storage))

            setLoadingLogin(false)
        }

        getUser()
    }, [])

    const singUp = async (email, password, name) => {
        setLoadingAuth(true)
        await auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) =>{
            let uid = value.user.uid
            await firestore().collection('users').doc(uid).set({
                nome: name,
                email: email,
                createAt: new Date()
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email
                }
                setUser(data)
                storageUser(data)
            })
        }).catch((erro) => {
            alert(erro)
        })
        .finally(() => setLoadingAuth(false))
    }

    const singIn = async (email, password) => {
        setLoadingAuth(true)
        await auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid
            const userProfile = await firestore().collection('users').doc(uid).get()

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                email: value.user.email
            }

            setUser(data)
            storageUser(data)
        })
        .catch((error) => alert(error))
        .finally(() => setLoadingAuth(false))
    }

    const singOut = async () => {
        await auth().singOut()
        await AsyncStorage.clear()
        .then(() => setUser(null))
    }

    const storageUser = async (data) => {
        await AsyncStorage.setItem('_user', JSON.stringify(data))
    }
    return(
        <AuthContext.Provider value={{isLogin: !!user, singUp, singIn, loadingAuth, loadingLogin, singOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}