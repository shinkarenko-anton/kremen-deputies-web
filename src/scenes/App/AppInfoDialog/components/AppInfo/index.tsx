import { View } from 'components/Base';
import React, { FC } from 'react';
import { colors, IStyle, IStyles, m } from 'styles';
import LogoVestnik from './assets/logo-vestnik-300w.png';

interface IProps {
  style?: IStyle;
}

const AppInfo: FC<IProps> = ({ style }) => {
  return (
    <View style={m(styles.container, style)}>
      <View style={styles.content}>
        <p>
          Карта виборчих округів дозволяє вам
          дізнатись хто є депутатом вашого району
          та як з ним зв&#39;язатись.
        </p>
        <p>
          Додаток не є комерційним і створений за
          власної ініціати кременчуцьких програмістів
          місцевої IT-спільноти <a href="http://io.kr.ua/" target="__blank">IQ Hub</a>.
        </p>
        <p>
          <a href="/rights">Права, обов‘язки та відповідальність депутата</a>
        </p>
        <p>
          Хочеш допомогти? Є ідеї або зауваження? Не вірна інформація? Пиши:
        </p>
        <p style={styles.contactRow}>
          <span style={m(styles.rowIcon, { color: colors.google })}>
            <span className="fa fa-envelope" />
          </span>
          <span style={styles.rowData}>
            <a href="mailto:websnipter@gmail.com" target="__blank">websnipter@gmail.com</a>
          </span>
        </p>
        <p style={styles.contactRow}>
          <span style={m(styles.rowIcon, { color: colors.google })}>
            <span className="fa fa-envelope" />
          </span>
          <span style={styles.rowData}>
            <a href="mailto:visnyk.kremenchuka@gmail.com" target="__blank">
              visnyk.kremenchuka@gmail.com
            </a>
          </span>
        </p>
        <p style={styles.contactRow}>
          <span style={m(styles.rowIcon, { color: colors.facebook })}>
            <span className="fa fa-facebook-official" />
          </span>
          <span style={styles.rowData}>
            <a href="https://www.facebook.com/snipter/" target="__blank">https://fb.com/snipter</a>
          </span>
        </p>
        <p style={styles.contactRow}>
          <span style={m(styles.rowIcon, { color: colors.facebook })}>
            <span className="fa fa-facebook-official" />
          </span>
          <span style={styles.rowData}>
            <a href="https://www.facebook.com/io.kr.ua/" target="__blank">https://fb.com/io.kr.ua</a>
          </span>
        </p>
        <p style={styles.contactRow}>
          <span style={m(styles.rowIcon, { color: colors.slack })}>
            <span className="fa fa-slack" />
          </span>
          <span style={styles.rowData}>
            <a href="https://slack.io.kr.ua/" target="__blank">slack.io.kr.ua</a>
          </span>
        </p>
        <p style={styles.contactRow}>
          <span style={m(styles.rowIcon, { color: colors.github })}>
            <span className="fa fa-github" />
          </span>
          <span style={styles.rowData}>
            <a href="https://github.com/iq-hub/kremen-constituencies-web" target="__blank">github.com</a>
          </span>
        </p>
        <p style={{ textAlign: 'center' }}>
          Партнер проекту
        </p>
        <p style={styles.logoContainer}>
          <a href="https://vestnik.in.ua/" target="__blank" style={styles.logoLink}>
            <img
              src={LogoVestnik}
              style={styles.logoImg}
              alt="Вісник Кременчука"
            />
          </a>
        </p>
      </View>
    </View>
  );
};

const styles: IStyles = {
  container: {},
  contactRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  rowIcon: {
    display: 'inline-block',
    width: 20,
    marginRight: 6,
    textAlign: 'center',
  },
  rowData: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  logoContainer: {
    textAlign: 'center',
  },
  logoLink: {
    borderBottom: 'none',
  },
  logoImg: {
    width: '160px',
  },
};

export default AppInfo;
