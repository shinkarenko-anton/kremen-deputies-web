import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { View } from 'components/Base';
import React, { FC } from 'react';
import { IStyle, mdMaxWidth, ScreenSize, sizes } from 'styles';

interface IProps {
  style?: IStyle;
}

const ContentPage: FC<IProps> = ({ style, children }) => {
  const classes = useStyles();
  return (
    <View className={classes.container} style={style}>
      <Paper className={classes.content}>
        {children}
      </Paper>
    </View>
  );
};

const useStyles = makeStyles({
  container: {
    padding: '30px 0',
    [mdMaxWidth(ScreenSize.Phone)]: {
      padding: 0,
    },
  },
  content: {
    maxWidth: '768px',
    margin: '0 auto',
    padding: '20px 30px',
    ['& p']: {
      marginTop: 0,
      marginBottom: 14,
    },
  },
});

export default ContentPage;
