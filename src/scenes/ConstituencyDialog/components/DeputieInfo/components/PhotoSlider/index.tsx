import { View } from 'components/UI';
import React, { PureComponent } from 'react';
import { IBaseStyle, IBaseStyles } from 'styles';

interface IProps {
  style?: IBaseStyle;
  items: string[];
}

export default class PhotoSlider extends PureComponent<IProps> {
  public render() {
    const { items, style } = this.props;
    if (!items.length) { return null; }
    return (
      <View style={[styles.container, style]}>
        <img src={items[0]} style={styles.img} alt="Фото депутата" />
      </View>
    );
  }
}

const styles: IBaseStyles = {
  container: {
    textAlign: 'center',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '300px',
    display: 'inline-block',
  },
};
