import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MainTabNavigation from '../navigation/TabNavigation/mainNavigation/MainTabNavigation';
import LoginStack from './login/LoginStack';

const InitialRender = () => {
  return true ? <MainTabNavigation /> : <LoginStack />;
};

export default InitialRender;
