import ContentPage from 'components/ContentPage';
import React, { FC } from 'react';
import AppInfo from 'scenes/AppInfo';

const AboutScreen: FC = () => {
  return (
    <ContentPage>
      <h1>Про додаток</h1>
      <AppInfo />
      <p>
        <a href="/">Повернутись до карти</a>
      </p>
    </ContentPage>
  );
};

export default AboutScreen;
