// React
import React from "react";
// UI
import FlatButton from 'material-ui/FlatButton';

const style = {
    container: {
        height: '100%', display: 'flex', flexDirection: 'column'
    },
    contactRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    rowIcon: {
        display: 'inline-block',
        width: 20,
        marginRight: 6,
        textAlign: 'center'
    },
    rowData: {
        flex: 1
    },
    content: {
        flex: 1
    },
    footer: {
        textAlign: 'center', 
        marginTop: 10
    },
    copyright: {
        marginTop: 10, 
        fontSize: '10px'
    }
}

// DeputieInfo
export default class DeputieInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Render

    render(){
        
        return (
            <div style={style.container}>
                <div style={style.content}>
                    <h3>Про додаток</h3>
                    <p>
                        Карта виборчих округів та депутатів.
                    </p>
                    <p style={style.contactRow}>
                        <span style={style.rowIcon}>
                            <span className="fa fa-envelope"></span>
                        </span>
                        <span style={style.rowData}>
                            <a href="mailto:websnipter@gmail.com" target="__blank">websnipter@gmail.com</a>
                        </span>
                    </p>
                </div>
                <div style={style.footer}>
                    <div>
                        <FlatButton 
                            label="Увійти" primary={true} 
                            onClick={(e) => this.props.onLoginClick(e)}/>
                    </div>
                    <div style={style.copyright}>
                        <a href="http://io.kr.ua/" target="__blank" style={{borderBottom: 'none'}}>
                            IQ Hub &copy; 2017 рік.
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}