// React
import React from "react";
// Utils
import _ from 'lodash';
// UI
import Slider from 'react-slick';
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";

// Styles

const photoImgStyle = {
    maxWidth: '100%',
    maxHeight: '300px',
    display: 'inline-block'
}

const  arrowStyle = {
    display: 'block', 
    width: 25, 
    height: 25, 
    color: 'white',
    lineHeight: '25px',
    fontSize: '18px',
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    zIndex: '100'
};

const arrowIconStyle = {
    position: 'relative',
    top: -1
}

const arrowLeftStyle = {
    left: 10,
}

const arrowRightStyle = {
    right: 10,
}

// SliderArrow
const SliderArrow = function(props){
    let {style, mode, currentSlide, slideCount, children, className, ...other} = props;
    let arrowModeStyle = mode == "prev" ? arrowLeftStyle : arrowRightStyle;
    return (
        <div style={_.assign({}, arrowStyle, arrowModeStyle)} {...other}>
            {mode == "prev" ? (
            <span className="fa fa-angle-left" style={arrowIconStyle}></span>
            ):(
            <span className="fa fa-angle-right" style={arrowIconStyle}></span>
            )}
        </div>
    );
}

// DeputiePhotosSlider
export default function DeputiePhotosSlider(props){
    let photos = props.photos;
    return (
        <Slider 
            arrows={photos.length > 1} 
            dots={false} 
            infinite={false}
            prevArrow={<SliderArrow mode="prev" />}
            nextArrow={<SliderArrow mode="next" />}
        >
            {_.map(photos, (photoSrc, index) => (
            <div key={index}>
                <div style={{textAlign: 'center'}}>
                    <img src={photoSrc} style={photoImgStyle} />
                </div>
            </div>
            ))}
        </Slider>
    );
}