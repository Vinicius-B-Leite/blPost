import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #36393f;
    justify-content: center;
    align-items: center;
`;
export const Title = styled.Text`
    color: #fff;
    font-size: 35px;
    font-weight: bold;
    font-style: italic;
`;
export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#3d3d3d'
})`
    width: 80%;
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    font-size: 17px;
    color: #000;
    border: ${prop => prop.error ? '1.3px' : undefined};
    border-color: ${prop => prop.error ? 'red' : undefined};
`;
export const Button = styled.TouchableOpacity`
    width: 80%;
    background-color: #418cfd;
    border-radius: 8px;
    margin-top: 10px;
    padding: 10px;
    align-items: center;
    justify-content: center;
`;
export const TxtButton = styled.Text`
    font-size: 20px;
`;

export const SingUpButton = styled.TouchableOpacity`
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
`
export const SingUpButtonText = styled.Text`
    font-size: 15px;
`

export const ErrorMessage = styled.Text`
    color: red;
    font-size: 16px;
`