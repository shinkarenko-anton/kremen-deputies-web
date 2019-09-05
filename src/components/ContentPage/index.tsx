import Paper from '@material-ui/core/Paper';
import { View } from 'components/Base';
import React, { PureComponent } from 'react';
import { IStyle, IStyles } from 'styles';

interface IProps {
  style?: IStyle;
}

export default class ContentPage extends PureComponent<IProps> {
  render() {
    const { style, children } = this.props;
    return (
      <View style={[ styles.container, style ]}>
        <Paper
          className="g-img-100"
          style={styles.content}
        >
          {children}
        </Paper>
      </View>
    );
  }
}

const styles: IStyles = {
  container: {
    backgroundColor: '#eee',
    padding: '30px 0',
    // [`@media (max-width: ${sizes.screens.phone})`]: {
    //   padding: 0,
    // },
  },
  content: {
    maxWidth: '768px',
    margin: '0 auto',
    padding: '20px 30px',
  },
};
