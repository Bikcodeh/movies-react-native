import {createContext} from 'react';

const PreferencesContext = createContext({
  theme: '',
  toggleTheme: () => {},
  drawerOptionSelected: '',
  setCurrentDrawerOption: (route: string) => {}
});

export default PreferencesContext;
