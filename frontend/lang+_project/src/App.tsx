import React from 'react';
import { MainPage } from './pages/MainPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { AddDayPage } from './pages/AddDayPage';

function App() {
  return (
    <LocalizationProvider dateAdapter = { AdapterMoment }>
      {/* <MainPage/> */}
      <AddDayPage/>
    </LocalizationProvider>
  )
}

export default App;
