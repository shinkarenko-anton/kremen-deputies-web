// React
import React from "react";
// Elements
import DeputieInfo from './DeputieInfo';
import DeputieAuth from './DeputieAuth';
import DeputieAdmin from './DeputieAdmin';

// DeputieSidebar
export default class DeputieSidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showAuth: false
        };
    }

    // Events

    onLoginClick(e){
        e.stopPropagation();
        this.setState({showAuth: true});
    }

    onGoBackClick(e){
        e.stopPropagation();
        this.setState({showAuth: false});
    }


    // Render

    render(){
        let user = this.props.user;
        return (
            <div style={{height: '100%'}}>
                {user ? (
                    <DeputieAdmin 
                        user={user}/>
                ) : (
                    this.state.showAuth ? (
                        <DeputieAuth 
                            onGoBackClick={(e) => this.onGoBackClick(e)}/>
                    ) : (
                        <DeputieInfo 
                            onLoginClick={(e) => this.onLoginClick(e)}/>
                    )
                )}
            </div>
        );
    }
}