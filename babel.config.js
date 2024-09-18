module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-iconify/plugin',
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    ['@babel/plugin-transform-class-properties', { loose: false }],  
    ['@babel/plugin-transform-private-methods', { loose: false }],    
    ['@babel/plugin-transform-private-property-in-object', { loose: false }],  
  ],
};
