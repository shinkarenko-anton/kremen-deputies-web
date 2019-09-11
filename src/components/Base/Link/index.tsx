import React, { FC, MouseEvent, ReactNode } from 'react';
import { IStyle, IStyles, m } from 'styles';

interface IProps {
  style?: IStyle;
  href?: string;
  email?: string;
  block?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

export const Link: FC<IProps> = ({ style: propsStyle, href, children, email, block, onClick }) => {
  const onLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onClick) { return; }
    e.preventDefault();
    onClick();
  };

  const getHref = () => {
    if (email) { return `mailto:${email}`; }
    if (href) { return href; }
    return '#';
  };

  const style = m(propsStyle, !!block && { display: 'block' });

  return (
    <a
      style={style}
      href={getHref()}
      target="__blank"
      onClick={onLinkClick}
    >
      {children}
    </a>
  );
};

const styles: IStyles = {
  container: {},
};
