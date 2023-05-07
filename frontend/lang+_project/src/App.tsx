import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { MainPage } from 'pages/MainPage';
import { AddDayPage } from 'pages/AddDayPage';
import { SignInPage } from "pages/SignInPage"

import { AddDayContextProvider } from 'context/AddDayContext';
import { ActivityPopUpContextProvider } from 'context/ActivityPopUpContext';

import { NavigationPanel } from 'components/common/NavigationPanel';
import { SignUpPage } from 'pages/SignUpPage';

function App() {
  return (
    <>
      {/* <NavigationPanel/>
      <ActivityPopUpContextProvider><MainPage/></ActivityPopUpContextProvider>
      <AddDayContextProvider><AddDayPage/></AddDayContextProvider> */}
      <BrowserRouter>
        <LocalizationProvider dateAdapter = { AdapterMoment }>
          <NavigationPanel/>
          <Routes>
            <Route path='/' element={<ActivityPopUpContextProvider><MainPage/></ActivityPopUpContextProvider>}/>
            <Route path='/add-day' element={<AddDayContextProvider><AddDayPage/></AddDayContextProvider>}/>
            <Route path="/login" element={ <SignInPage /> }/>
            <Route path='/register' element= { <SignUpPage/> }/>
          </Routes>
        </LocalizationProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
