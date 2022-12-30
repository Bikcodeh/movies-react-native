import {
  MD3DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from 'react-native-paper';
import {
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from '@react-navigation/native';

DarkThemePaper.colors.primary = '#1ae1f2';
DarkThemePaper.colors.secondary = '#1ae1f2';

DarkThemeNavigation.colors.background = '#192734';
DarkThemeNavigation.colors.card = '#15212b';

export default {
  DarkThemePaper,
  DarkThemeNavigation,
  DefaultThemePaper,
  DefaultThemeNavigation,
};
