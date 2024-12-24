export default {
  name: 'Trixapps',
  slug: 'Trixapps',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  web: {
    bundler: 'webpack'
  },
  plugins: [
    'expo-router'
  ]
};