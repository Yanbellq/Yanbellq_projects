import React, { useState, useEffect } from 'react';
import CustomHeaderButton from './selfBtn';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Button, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faZ } from '@fortawesome/free-solid-svg-icons';

export default function Edit(props) {

    const movie = props.navigation.getParam('movie', null)
    const token = props.navigation.getParam('token', '')

    console.log(token, '   awai from edit');

    const [ title, setTitle ] = useState(movie.title)
    const [ description, setDescription ] = useState(movie.description)

    const saveMovie = () => {
        if(movie.id) {
            console.log(token, '   save to update');

            fetch(`http://192.168.31.66:8000/api/movies/${movie.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                })
            })
            .then(response => response.json())
            .then(movie => {        
                props.navigation.navigate('Detail', {movie: movie, title: movie.title})
            })
            .catch( error => console.log(error))
        } else {
            console.log(token, '   add new');

            fetch(`http://192.168.31.66:8000/api/movies/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                })
            })
            .then(response => response.json())
            .then(movie => {        
                props.navigation.navigate('MovieList')
            })
            .catch( error => console.log(error))
        }

        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} placeholder='Enter title' onChangeText={text => setTitle(text)} value={title} />
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} placeholder='Enter description' onChangeText={text => setDescription(text)} value={description} />

            <Button onPress={() => saveMovie()} title={movie.id ? "Edit" : "Add"} />
        </View>
    );
}

Edit.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('title'),
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        
    },
    headerRight: (
        // <Button title="Edit" style={styles.editBtn} onPress={() => screenProps.navigation.navigate('Edit')} />
        <CustomHeaderButton  title="Remove" onPress={() => removeClicked(screenProps)} />
    )
})

const removeClicked = (props) => {
    const movie = props.navigation.getParam('movie');
    const token = props.navigation.getParam('token', '')

    console.log(token, '   deleted');


    fetch(`http://192.168.31.66:8000/api/movies/${movie.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(movie => {        
        props.navigation.navigate('MovieList')
    })
    .catch( error => console.log(error))
}

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
    }
});
