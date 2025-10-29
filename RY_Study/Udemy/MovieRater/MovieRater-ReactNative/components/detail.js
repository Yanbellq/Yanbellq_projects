import React, { useState, useEffect } from 'react';
import CustomHeaderButton from './selfBtn';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faZ } from '@fortawesome/free-solid-svg-icons';

export default function Detail(props) {

    const movie = props.navigation.getParam('movie', null)
    const token = props.navigation.getParam('token', '')
    const [ highlight, setHighlight ] = useState(0);

    const rateClicked = () => {
        if(highlight > 0 && highlight < 6) {
            fetch(`http://192.168.31.66:8000/api/movies/${movie.id}/rate_movie/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    stars: highlight,
                })
            })
            .then(response => response.json())
            .then(res => { 
                setHighlight(0);       
                Alert.alert("Rating",res.message);
            })
            .catch( error => Alert.alert("", error))
        };
    }

    return (
        <View style={styles.container}>

            <View style={styles.starContainer}>
                <FontAwesomeIcon style={movie.average_rating > 0 ? styles.orange : styles.white } icon={faStar} />
                <FontAwesomeIcon style={movie.average_rating > 1 ? styles.orange : styles.white } icon={faStar} />
                <FontAwesomeIcon style={movie.average_rating > 2 ? styles.orange : styles.white } icon={faStar} />
                <FontAwesomeIcon style={movie.average_rating > 3 ? styles.orange : styles.white } icon={faStar} />
                <FontAwesomeIcon style={movie.average_rating > 4 ? styles.orange : styles.white } icon={faStar} />
                <Text style={styles.white}>({movie.number_of_ratings})</Text>
            </View>

            <Text style={styles.description}>{ movie.description }</Text>

            <View style={styles.bb} />
            <Text style={styles.description}> Rate it !!! </Text>
                
            <View style={styles.ratingContainer}>
                <TouchableOpacity onPress={() => setHighlight(1)} >
                    <FontAwesomeIcon style={highlight > 0 ? styles.purple : styles.grey } icon={faStar} size={40} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setHighlight(2)} >
                    <FontAwesomeIcon style={highlight > 1 ? styles.purple : styles.grey } icon={faStar} size={40} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setHighlight(3)} >
                    <FontAwesomeIcon style={highlight > 2 ? styles.purple : styles.grey } icon={faStar} size={40} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setHighlight(4)} >
                    <FontAwesomeIcon style={highlight > 3 ? styles.purple : styles.grey } icon={faStar} size={40} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setHighlight(5)} >
                    <FontAwesomeIcon style={highlight > 4 ? styles.purple : styles.grey } icon={faStar} size={40} />
                </TouchableOpacity>
            </View>

            <Button title="Rate" onPress={() => rateClicked()} />
        </View>
    );
}

Detail.navigationOptions = screenProps => ({
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
        <CustomHeaderButton  title="Edit" 
            onPress={() => {
                const movie = screenProps.navigation.getParam('movie');
                const token = screenProps.navigation.getParam('token', '');
                console.log(token, '   via details to edit')
                screenProps.navigation.navigate('Edit', { movie, token })
            }} 

        />
    )
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c35',
        padding: 10,
        color: 'white',
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
    logo: {
        width: '100%',
        height: 135,
        paddingTop: 50,
        marginTop: 30,
    },
    starContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    orange: {
        color: 'orange',
    },
    white: {
        color: 'white',
    },
    purple: {
        color: 'purple',
    },
    grey: {
        color: '#ccc',
    },
    description: {
        fontSize: 20,
        color: 'white',
        padding: 10,
        
    },
    editBtn: {
        color: 'white',
        backgroundColor: 'none',
        borderWidth: 0,
    },
    bb: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
    }
});
