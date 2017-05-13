// React
import React from "react";
// Utils
import _ from 'lodash';
import utils from '../../shared/Services/Utils';
// UI
import DeputiePhotosSlider from './DeputiePhotosSlider';
// Theme
import {threeDots} from '../../shared/Style/mixings';

// Style
const deputieStyle = {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    name: {
        fontWeight: 'bold',
        fontSize: '18px'
    },
    avatar: {
        width: 240,
        marginRight: 12
    },
    dataContainer: {
        flex: 1
    },
    row: {
        marginBottom: 12,
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
    }
}

// DeputieInfo
export default function DeputieInfo(props){
    let {deputie, style, ...other} = props;
    if(!deputie) return null;

    return (
        <div style={_.assign({}, deputieStyle.container, style)}>
            {deputie.photos && deputie.photos.length ? (
            <div style={deputieStyle.avatar}>
                <DeputiePhotosSlider photos={deputie.photos} />
            </div>
            ) : null}
            <div style={deputieStyle.dataContainer}>
                <div style={deputieStyle.row}>
                    <div style={deputieStyle.name}>
                        {deputie.name}
                    </div>
                </div>
                {deputie.schedule ? (
                <div style={deputieStyle.row}>
                    <div style={deputieStyle.rowIcon}><i className="fa fa-calendar"></i></div>
                    <div style={deputieStyle.rowData}>{utils.str.capitalizeFirstLetter(deputie.schedule)}</div>
                </div>
                ) : null}
                {deputie.address ? (
                <div style={deputieStyle.row}>
                    <div style={deputieStyle.rowIcon}><i className="fa fa-map-marker"></i></div>
                    <div style={deputieStyle.rowData}>{utils.str.capitalizeFirstLetter(deputie.address)}</div>
                </div>
                ) : null}
                {deputie.fb ? (
                <div style={deputieStyle.row}>
                    <div style={deputieStyle.rowIcon}><i className="fa fa-facebook-official"></i></div>
                    <div style={_.assign({}, deputieStyle.rowData, threeDots)}>
                        <a href={deputie.fb} target="__blank">{deputie.fb}</a>
                    </div>
                </div>
                ) : null}
                {deputie.twitter ? (
                <div style={deputieStyle.row}>
                    <div style={deputieStyle.rowIcon}><i className="fa fa-twitter"></i></div>
                    <div style={deputieStyle.rowData}>
                        <a href={deputie.twitter} target="__blank">{deputie.twitter}</a>
                    </div>
                </div>
                ) : null}
                {deputie.vk ? (
                <div style={deputieStyle.row}>
                    <div style={deputieStyle.rowIcon}><i className="fa fa-vk"></i></div>
                    <div style={deputieStyle.rowData}>
                        <a href={deputie.vk} target="__blank">{deputie.vk}</a>
                    </div>
                </div>
                ) : null}
                {deputie.phones && deputie.phones.length ? (
                    _.map(deputie.phones, (phonedeputie, key) => (
                        <div key={key} style={deputieStyle.row}>
                            <div style={deputieStyle.rowIcon}><i className="fa fa-phone"></i></div>
                            <div style={deputieStyle.rowData}>
                                <a href={"tel:" + phonedeputie} target="__blank">{phonedeputie}</a>
                            </div>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    );
}