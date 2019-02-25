import { View } from 'components/UI';
import React, { PureComponent } from 'react';
import { IBaseStyle, IBaseStyles } from 'styles';

import googlePlayLogo from './assets/google-play-logo-vector.svg';
import iqHubLogo from './assets/iqhub-logo-300w.png';
import vestnikLogo from './assets/vestnik-logo-300w.png';

const items = [
  {
    icon: iqHubLogo,
    title: 'IQ Hub',
    link: 'https://io.kr.ua/',
  },
  {
    icon: vestnikLogo,
    title: 'Вісник Кременчука',
    link: 'https://vestnik.in.ua/',
  },
  {
    icon: googlePlayLogo,
    title: 'Карта виборчих округів Кременчука в Google Play',
    link: 'https://play.google.com/store/apps/details?id=constituencies.kremen.ua',
  },
];

interface IProps {
  style?: IBaseStyle;
}

export default class Brands extends PureComponent<IProps> {
  public render() {
    const { style } = this.props;
    return (
      <View style={[styles.container, style]}>
        {items.map(({icon, title, link}, index) => (
          <View
            key={index}
            style={styles.item}
          >
            <a
              href={link}
              target='__blank'
              style={styles.link}
            >
              <img
                src={icon}
                style={styles.img}
                alt={title}
              />
            </a>
          </View>
        ))}
      </View>
    );
  }
}

const styles: IBaseStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  link: {
    borderBottom: 'none',
    cursor: 'pointer',
  },
  img: {
    width: 100,
  },
};
