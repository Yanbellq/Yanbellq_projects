import React, { Component } from "react";
import { CtxConsumer } from "../index";

class Footer extends Component {

    state = {
        // name: 'Maksym'
        name: '',
        age: 19,
        isLogin: true,
    }

    default = {
        name: 'Enter your name'
    }

    changed = event => {
        // console.log('changed', event.target.value);
        this.setState({name: event.target.value});
        console.log(this.state.name);
    }
    
    componentDidMount() {
        this.setState({name: 'MyName'});
    }

    render() {

        // const animals = ['cat', 'dog', 'horse']

        // return (
        //     <CtxConsumer>
        //         {(context) => (
        //             <div>
        //                 { context.animals.map( animal => {
        //                     return (
        //                         //<div key={animal.id}>
        //                         <div key={animal}>
        //                             <h1>{ animal }</h1>
        //                         </div>
        //                     );
        //                 }) }
        //             </div>
        //         )}
        //     </CtxConsumer>
        // )

        return (
            <div>
                { this.state.isLogin ? (
                    <React.Fragment>
                        <h2 onClick={this.props.myalert}>
                            { this.props.trademark }
                        </h2>
                        <input value={this.state.name} placeholder={this.default.name}
                            onChange={this.changed} type="text"/>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h2>You can't see this content</h2>
                        <h2>You must be login</h2>
                    </React.Fragment>
                ) }
            </div>
        )
    }
}

export default Footer;