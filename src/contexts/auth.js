import React, { createContext, useState } from "react";

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


export const AuthContext = createContext({})

export default function AuthContextProvider({children}){

    const [user, setUser] = useState(null)

    const singUp = async (email, password, name) => {
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
            })
        }).catch((erro) => {
            alert(erro)
        })
    }

    return(
        <AuthContext.Provider value={{isLogin: !!user, singUp}}>
            {children}
        </AuthContext.Provider>
    )
}