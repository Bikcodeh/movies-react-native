import {createContext} from 'react';

const PreferencesContext = createContext({
  theme: '',
  toggleTheme: () => {},
  drawerOptionSelected: '',
  setCurrentDrawerOption: () => {},
});

export default PreferencesContext;
