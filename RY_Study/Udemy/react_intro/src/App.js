import React from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Numbers from './components/numbers';
import styled from 'styled-components'

function createAlert() {
    alert('hui');
}

let ShowMessage = (props) => {
    if(props.toShow) {
        return <h2>My message</h2>
    } else {
        return <h2>Forbidden</h2>
    }
}

const pStyle = {
    fontSize: '4em',
    color: 'red',
}

const Paragraph = styled.p`
    font-size: 3em;
    color: green;
`;

// function App() {
//     const userLogin = true;

//     if(userLogin) {
//         return (Numbers
//             <div className="App">
//                 <Header info="This is MY message"/>
    
//                 <p style={pStyle}>Main Content</p>
//                 <Paragraph>New Styled</Paragraph>
//                 <Paragraph>New Styled</Paragraph>
                
//                 <Footer trademark="page by Yanbellq" 
//                     myalert={createAlert}
//                 />
//                 <ShowMessage toShow={false}/>

//                 {  }
//             </div>
//         );
//     } else {
//         return <h2>Forbidden</h2>
//     }
// }

function App() {
    return (
        <div className='App'>
            <Numbers />
        </div>
    )
}

export default App;
