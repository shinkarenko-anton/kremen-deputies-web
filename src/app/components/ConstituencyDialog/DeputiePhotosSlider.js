// React
import React from "react";
// Utils
import _ from 'lodash';

// Styles
const containerStyle = {
    textAlign: 'center'
}

const photoImgStyle = {
    maxWidth: '100%',
    maxHeight: '300px',
    display: 'inline-block'
}

// DeputiePhotosSlider
export default function DeputiePhotosSlider(props){
    let photos = props.photos;
    if(!photos.length) return null;
    
    return (
        <div style={_.assign({}, containerStyle, props.style)}>
            <img src={photos[0]} style={photoImgStyle} />
        </div>
    );
}