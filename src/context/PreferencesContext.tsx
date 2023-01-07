import {createContext} from 'react';

const PreferencesContext = createContext({
  theme: '',
  toggleTheme: () => {},
  drawerOptionSelected: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCurrentDrawerOption: (route: string) => {},
});

export default PreferencesContext;
