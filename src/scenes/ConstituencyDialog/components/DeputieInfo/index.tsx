import { IDeputie } from 'common';
import { View } from 'components/UI';
import React, { PureComponent } from 'react';
import { IBaseStyle, IBaseStyles, threeDots } from 'styles';
import { capitalizeFirstLetter } from 'utils';
import PhotoSlider from './components/PhotoSlider';

interface IProps {
  style?: IBaseStyle;
  item: IDeputie;
}

export default class DeputieInfo extends PureComponent<IProps> {
  render() {
    const { item, style } = this.props;
    const { name, photos, phones, schedule, address, fb, twitter } = item;
    return (
      <View style={style} className="deputie-info">
        {(photos && photos.length) && (
          <View className="deputie-info__photos">
            <PhotoSlider items={photos} />
          </View>
        )}
        <View className="deputie-info__info">
          {!!name && (
            <View className="deputie-info__row">
              <View className="deputie-info__name">
                {name}
              </View>
            </View>
          )}
          {!!schedule && (
            <View className="deputie-info__row">
              <View className="deputie-info__rowicon"><i className="fa fa-calendar" /></View>
              <View className="deputie-info__rowdata">
                {capitalizeFirstLetter(schedule)}
              </View>
            </View>
          )}
          {!!address && (
            <View className="deputie-info__row">
              <View className="deputie-info__rowicon"><i className="fa fa-map-marker" /></View>
              <View className="deputie-info__rowdata">
                {capitalizeFirstLetter(address)}
              </View>
            </View>
          )}
          {!!fb && (
            <View className="deputie-info__row">
              <View className="deputie-info__rowicon"><i className="fa fa-facebook-official" /></View>
              <View className="deputie-info__rowdata" style={styles.fb}>
                <a href={fb} target="__blank">{fb}</a>
              </View>
            </View>
          )}
          {!!twitter && (
            <View className="deputie-info__row">
              <View className="deputie-info__rowicon"><i className="fa fa-twitter" /></View>
              <View className="deputie-info__rowdata">
                <a href={twitter} target="__blank">{twitter}</a>
              </View>
            </View>
          )}
          {(phones && phones.length) && (
            phones.map((phonedeputie, key) => (
              <View key={key} className="deputie-info__row">
                <View className="deputie-info__rowicon"><i className="fa fa-phone" /></View>
                <View className="deputie-info__rowdata">
                  <a href={`tel:${phonedeputie}`} target="__blank">{phonedeputie}</a>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    );
  }
}

const styles: IBaseStyles = {
  fb: {
    ...threeDots,
    width: 260,
  },
};
