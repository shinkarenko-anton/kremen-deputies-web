import { isArray } from 'lodash';
import React, { CSSProperties, PureComponent, ReactNode, SyntheticEvent } from 'react';
import { IBaseStyles, m } from 'styles';

interface IProps {
  style?: CSSProperties | any[];
  className?: string;
  children?: ReactNode;
  row?: boolean;
  column?: boolean;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-end';
  alignItems?: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'self-start' | 'self-end';
  onClick?: (e: SyntheticEvent) => void;
}

export default class View extends PureComponent<IProps> {
  render() {
    const { style, className, children, row, column, direction, justifyContent, alignItems, onClick } = this.props;
    const cStyle = m(
      styles.container,
      row ? { flexDirection: 'row' } : null,
      column ? { flexDirection: 'column' } : null,
      direction ? {flexDirection: direction} : null,
      justifyContent ? { justifyContent } : null,
      alignItems ? { alignItems } : null,
      isArray(style) ? m(...style) : style,
    );
    return (
      <div className={className} style={cStyle} onClick={onClick}>
        {children}
      </div>
    );
  }
}

const styles: IBaseStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
};
