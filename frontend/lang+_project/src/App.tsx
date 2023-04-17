import React from 'react';
import { MainPage } from './pages/MainPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { AddDayPage } from './pages/AddDayPage';
import { AddDayContextProvider } from './context/AddDayContext';

function App() {
  return (
    <LocalizationProvider dateAdapter = { AdapterMoment }>
      {/* <MainPage/> */}
      <AddDayContextProvider><AddDayPage/></AddDayContextProvider>
    </LocalizationProvider>
  )
}

export default App;
