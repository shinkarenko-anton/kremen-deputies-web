// React
import React from "react";
// Utils
import _ from 'lodash';
// UI
import FlatButton from 'material-ui/FlatButton';
// Theme
import colors from '../../../shared/Theme/Colors';
// Assets
import vestnikLogo from '../../../../assets/img/logo/vestnik-logo-300w.png';

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
    },
    version: {
        marginTop: 6,
        fontSize: 8
    },
    logoContainer: {
        
    },
    logoLink: {
        borderBottom: 'none'
    },
    logoImg: {
        width: '160px'
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
                        Карта виборчих округів дозволяє вам дізнатись хто є депутатом вашого району та як з ним зв'язатись. 
                    </p>
                    <p>
                        Додаток не є комерційним і створений за власної ініціати кременчуцьких програмістів місцевої IT-спільноти <a href="http://io.kr.ua/" target="__blank">IQ Hub</a>.
                    </p>
                    <p>
                        Хочеш допомогти? Є ідеї або зауваження? Не вірна інформація? Пиши:
                    </p>
                    <p style={style.contactRow}>
                        <span style={_.assign({}, style.rowIcon, {color: colors.google})}>
                            <span className="fa fa-envelope"></span>
                        </span>
                        <span style={style.rowData}>
                            <a href="mailto:websnipter@gmail.com" target="__blank">websnipter@gmail.com</a>
                        </span>
                    </p>
                    <p style={style.contactRow}>
                        <span style={_.assign({}, style.rowIcon, {color: colors.google})}>
                            <span className="fa fa-envelope"></span>
                        </span>
                        <span style={style.rowData}>
                            <a href="mailto:visnyk.kremenchuka@gmail.com" target="__blank">visnyk.kremenchuka@gmail.com</a>
                        </span>
                    </p>
                    <p style={style.contactRow}>
                        <span style={_.assign({}, style.rowIcon, {color: colors.facebook})}>
                            <span className="fa fa-facebook-official"></span>
                        </span>
                        <span style={style.rowData}>
                            <a href="https://www.facebook.com/io.kr.ua/" target="__blank">https://fb.com/io.kr.ua</a>
                        </span>
                    </p>
                    <p style={style.contactRow}>
                        <span style={_.assign({}, style.rowIcon, {color: colors.slack})}>
                            <span className="fa fa-slack"></span>
                        </span>
                        <span style={style.rowData}>
                            <a href="https://slack.io.kr.ua/" target="__blank">slack.io.kr.ua</a>
                        </span>
                    </p>
                    <p>
                        Партнер проекту:
                    </p>
                    <p style={style.logoContainer}>
                        <a href="https://vestnik.in.ua/" target="__blank" style={style.logoLink}>
                            <img src={vestnikLogo} style={style.logoImg} />
                        </a>
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
                    <div style={style.version}>
                        {"v" + VERSION}
                    </div>
                </div>
            </div>
        );
    }
}