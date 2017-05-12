// React
import React from "react";
// Utils
import _ from 'lodash';
// Assets
import vestnikLogo from '../../../assets/img/logo/vestnik-logo-300w.png';
import iqHubLogo from '../../../assets/img/logo/iqhub-logo-300w.png';

// Style
const style = {
    container: {
        display: 'flex', 
        flexDirection: 'column'
    }
}

// BrandsPanel
export default class BrandsPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Render

    render(){
        return (
            <div style={_.assign({}, style.container, this.props.style)}>
                <div style={{padding: '5px'}}>
                    <a href="http://io.kr.ua/" target="__blank" style={{borderBottom: 'none'}}>
                        <img src={iqHubLogo} style={{width: '100%'}} />
                    </a>
                </div>
                <div style={{padding: '5px'}}>
                    <a href="http://vestnik.in.ua/" target="__blank" style={{borderBottom: 'none'}}>
                        <img src={vestnikLogo} style={{width: '100%'}} />
                    </a>
                </div>
            </div>
        );
    }
}