// React
import React from "react";
// UI
import FlatButton from 'material-ui/FlatButton';

// DeputieInfo
export default class DeputieInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Render

    render(){
        return (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{flex: 1}}>
                    <h3>Про додаток</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam impedit quae omnis dicta, praesentium quam accusantium ad enim iure dolores veritatis adipisci distinctio tempore cum placeat voluptates error. Perspiciatis, eius.
                    </p>
                </div>
                <div style={{textAlign: 'center', marginTop: 10}}>
                    <div>
                        <FlatButton 
                            label="Увійти" primary={true} 
                            onClick={(e) => this.props.onLoginClick(e)}/>
                    </div>
                    <div style={{marginTop: 10, fontSize: '10px'}}>
                        <a href="http://io.kr.ua/" target="__blank" style={{borderBottom: 'none'}}>
                            IQ Hub &copy; 2017 рік.
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}