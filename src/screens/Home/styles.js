import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #36393f;
`;

export const Button = styled.TouchableOpacity`
    position: absolute;
    right: 5%;
    bottom: 5%;
    background-color: #202225;
    padding: 5%;
    justify-content: center;
    align-items: center;
    border-radius: 35px;
    z-index: 2;
`

export const ListPost = styled.FlatList`
    flex: 1;
    background-color: #f1f1f1;
`