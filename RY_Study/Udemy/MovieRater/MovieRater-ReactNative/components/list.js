import React, { useState, useEffect } from 'react';
import CustomHeaderButton from './selfBtn';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieList(props) {

    const [ movies, setMovies ] = useState([]);
    const [ token, setToken ] = useState(null);

    const getData = async() => {
        const storedToken = await AsyncStorage.getItem('MR_Token')
        setToken(storedToken)
        if(storedToken) {
            getMovies(storedToken);
            // Додаємо токен у navigation params
            props.navigation.setParams({ token: storedToken });
        } else {
            props.navigation.navigate("Auth");
        }
    }

    useEffect(() => {
        getData();
    });

    const getMovies = (authToken) => {
        fetch('http://192.168.31.66:8000/api/movies/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
        })
        .then(response => response.json())
        .then(jsonResponse => setMovies(jsonResponse))
        .catch( error => console.log(error))
    }

    const movieClicked = (movie) => {
        props.navigation.navigate('Detail', {movie: movie, title: movie.title, token})
    }

    return (
        <View>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/favicon.png')} 
                style={styles.logo} resizeMode='contain'/>
                <Text style={styles.logoText}>Movie Rater</Text>
            </View>

            <FlatList 
                data={movies}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => movieClicked(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

MovieList.navigationOptions = screenProps => ({
    title: "List of movies",
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
        <CustomHeaderButton 
            title="Add new" 
            onPress={() => screenProps.navigation.navigate(
                'Edit', 
                {
                    movie: {title: '', description: ''},
                    token: screenProps.navigation.getParam('token'),
                }
            )}     
        />
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 35,
    },
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: '#282c35',
    },
    itemText: {
        flex: 1,
        color: 'white',
        fontSize: 24,
    },
    logoContainer: {
        backgroundColor: '#282c35',
        position: 'relative',
        // flexDirection: 'row',
        padding: 50,
    },
    logo: {
        // width: '100%',
        height: 50,
        width: '50%',
        // borderColor: 'black',
        // borderWidth: 2,
        padding: 0,
        // marginTop: 30,
        // marginBottom: 2,
        
    },
    logoText: {
        color: 'orange',
        position: 'absolute',
        right: 80,
        top: 60,
        fontSize: 30,
        fontWeight: 700,
        
    }
});
