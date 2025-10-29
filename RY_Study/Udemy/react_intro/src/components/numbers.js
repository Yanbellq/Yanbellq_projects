import React, { useState, useEffect } from "react";

const Numbers = () => {
    const [numbers, setNumbers] = useState(['one', 'two', 'three'])
    const [letters, setLetters] = useState(['a', 'b', 'c'])


    const addNumber = () => {
        setNumbers([...numbers, 'four'])
    }
    
    const addLetters = () => {
        setLetters([...letters, 'hui'])
    }


    useEffect(() => {
        console.log('our use effect triggers only on letters');
    }, [letters])
    
    useEffect(() => {
        console.log('our use effect triggers only on numbers');
    }, [numbers])

    return (
        <React.Fragment>
            <h1>Numbers</h1>

            { numbers.map( num => {
                return <h4>{ num }</h4>
            }) }
            <button onClick={addNumber}>Click to add a number</button>


            <h1>Letters</h1>
            { letters.map( letter => {
                return <h4>{ letter }</h4>
            }) }

            <button onClick={addLetters}>Click to add a letter</button>
        </React.Fragment>
    )
}


export default Numbers;