import { View } from 'components/Base';
import React, { FC } from 'react';
import { IStyle, IStyles } from 'styles';
import iqHubLogo from './assets/iqhub-logo-300w.png';
import vestnikLogo from './assets/vestnik-logo-300w.png';

interface IProps {
  style?: IStyle;
}

const Brands: FC<IProps> = ({ style }) => {

  const items = [ {
    icon: iqHubLogo,
    title: 'IQ Hub',
    link: 'https://io.kr.ua/',
  }, {
    icon: vestnikLogo,
    title: 'Вісник Кременчука',
    link: 'https://vestnik.in.ua/',
  } ];

  return (
    <View
      style={[ styles.container, style ]}
      row={true}
      justifyContent="center"
      alignItems="center"
    >
      {items.map(({icon, title, link}, index) => (
        <View
          key={index}
          style={styles.item}
        >
          <a
            href={link}
            target="__blank"
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
};

const styles: IStyles = {
  container: { },
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

export default Brands;
