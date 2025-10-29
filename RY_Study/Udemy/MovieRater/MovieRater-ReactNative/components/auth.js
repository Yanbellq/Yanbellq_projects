import React, { useState, useEffect } from 'react';
import CustomHeaderButton from './selfBtn';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faZ } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth(props) {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ regView, setRegView ] = useState(false)


    const [ status, setStatus ] = useState('');

    useEffect(() => {
        getData();
    }, [])

    const auth = () => {
        if(regView) {
            fetch(`http://192.168.31.66:8000/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(async res => {
                // console.log(res);
                
                if(res.non_field_errors) setStatus(res.non_field_errors);
                else {
                    setRegView(false)
                }
    
            })
            .catch( error => console.log(error))
        } else {
            fetch(`http://192.168.31.66:8000/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(async res => {
                // console.log(res);
                
                if(res.non_field_errors) setStatus(res.non_field_errors);
                else {
                    // console.log(res.token);
                    await saveData(res.token);
                    props.navigation.navigate('MovieList');
                }
    
            })
            .catch( error => console.log(error))
        }

    }

    const saveData = async(token) => {
        await AsyncStorage.setItem('MR_Token', token)
        console.log(token, '   save');
    }
    
    const getData = async() => {
        const token = await AsyncStorage.getItem('MR_Token');
        console.log(token, '   get');
        if(token) props.navigation.navigate("MovieList")
    }

    const toggleView = () => {
        setRegView(!regView);
        console.log(regView);
        props.navigation.setParams({regView: regView})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} placeholder='Enter your username' onChangeText={text => setUsername(text)} value={username} autoCapitalize='none' />
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder='Enter your password' onChangeText={text => setPassword(text)} value={password} autoCapitalize='none' secureTextEntry={true} />

            <Button onPress={() => auth()} title={ regView ? "Register" : "Login" } />

            <TouchableOpacity onPress={() => toggleView()}>
                { regView ? 
                    <Text style={styles.authTypeToggle} >Already have an account? Login here</Text> :
                    <Text style={styles.authTypeToggle} >Don't have an account? Register here?</Text>
                }
            </TouchableOpacity>

            <Text style={styles.statusText}>{ status }</Text>
        </View>
    );
}

Auth.navigationOptions = screenProps => ({
    title: ( screenProps.navigation.getParam('regView') ? "Login" : "Register" ),
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c35',
        padding: 10,
        color: 'white',
    },
    label: {
        fontSize: 24,
        color: 'white',
        padding: 10,   
    },
    input: {
        fontSize: 24,
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
    },
    statusText: {
        width: '100%',
        fontSize: 24,
        color: 'white',
        marginTop: 20,
        // marginLeft: 150,
    },
    authTypeToggle: {
        color: 'white',
        marginTop: 50,
        marginLeft: 70,   
    }
});
