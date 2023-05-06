import React from 'react';
import { MainPage } from './pages/MainPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { AddDayPage } from './pages/AddDayPage';
import { AddDayContextProvider } from './context/AddDayContext';
import { ActivityPopUp } from './components/main_page/ActivityPopUp';
import { ActivityPopUpContextProvider } from './context/ActivityPopUpContext';

function App() {
  return (
    <LocalizationProvider dateAdapter = { AdapterMoment }>
      {/* <ActivityPopUpContextProvider><MainPage/></ActivityPopUpContextProvider> */}
      <AddDayContextProvider><AddDayPage/></AddDayContextProvider>
    </LocalizationProvider>
  )
}

export default App;
