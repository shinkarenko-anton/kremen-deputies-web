// Utils
import _ from 'lodash';
import utils from 'utils';
// React
import React from 'react';
import PropTypes from 'prop-types';
// UI
import DeputiePhotosSlider from './DeputiePhotosSlider';
// Styles
import { mixings } from 'styles';

// PropTypes

const propTypes = {
  deputie: PropTypes.object.isRequired,
  style: PropTypes.object,
};

const defaultProps = {
  style: {},
};

// DeputieInfo

function DeputieInfo(props) {
  const { deputie, style } = props;
  if (!deputie) return null;

  return (
    <div style={style} className="deputie-info">
      {deputie.photos && deputie.photos.length ? (
        <div className="deputie-info__photos">
          <DeputiePhotosSlider photos={deputie.photos} />
        </div>
      ) : null}
      <div className="deputie-info__info">
        <div className="deputie-info__row">
          <div className="deputie-info__name">
            {deputie.name}
          </div>
        </div>
        {deputie.schedule ? (
          <div className="deputie-info__row">
            <div className="deputie-info__rowicon"><i className="fa fa-calendar" /></div>
            <div className="deputie-info__rowdata">
              {utils.str.capitalizeFirstLetter(deputie.schedule)}
            </div>
          </div>
        ) : null}
        {deputie.address ? (
          <div className="deputie-info__row">
            <div className="deputie-info__rowicon"><i className="fa fa-map-marker" /></div>
            <div className="deputie-info__rowdata">
              {utils.str.capitalizeFirstLetter(deputie.address)}
            </div>
          </div>
        ) : null}
        {deputie.fb ? (
          <div className="deputie-info__row">
            <div className="deputie-info__rowicon"><i className="fa fa-facebook-official" /></div>
            <div className="deputie-info__rowdata" style={_.assign({}, mixings.threeDots, { width: 260 })}>
              <a href={deputie.fb} target="__blank">{deputie.fb}</a>
            </div>
          </div>
        ) : null}
        {deputie.twitter ? (
          <div className="deputie-info__row">
            <div className="deputie-info__rowicon"><i className="fa fa-twitter" /></div>
            <div className="deputie-info__rowdata">
              <a href={deputie.twitter} target="__blank">{deputie.twitter}</a>
            </div>
          </div>
        ) : null}
        {deputie.vk ? (
          <div className="deputie-info__row">
            <div className="deputie-info__rowicon"><i className="fa fa-vk" /></div>
            <div className="deputie-info__rowdata">
              <a href={deputie.vk} target="__blank">{deputie.vk}</a>
            </div>
          </div>
        ) : null}
        {deputie.phones && deputie.phones.length ? (
            _.map(deputie.phones, (phonedeputie, key) => (
              <div key={key} className="deputie-info__row">
                <div className="deputie-info__rowicon"><i className="fa fa-phone" /></div>
                <div className="deputie-info__rowdata">
                  <a href={`tel:${phonedeputie}`} target="__blank">{phonedeputie}</a>
                </div>
              </div>
            ))
        ) : null}
      </div>
    </div>
  );
}

DeputieInfo.propTypes = propTypes;
DeputieInfo.defaultProps = defaultProps;

export default DeputieInfo;
