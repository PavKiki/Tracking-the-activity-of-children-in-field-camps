import React, { useContext } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { MainPage } from 'pages/MainPage';
import { AddDayPage } from 'pages/AddDayPage';
import { SignInPage } from "pages/SignInPage"

import { AddDayContextProvider } from 'context/AddDayContext';
import { ActivityPopUpContextProvider } from 'context/ActivityPopUpContext';

import { NavigationPanel } from 'components/navigation/NavigationPanel';
import { SignUpPage } from 'pages/SignUpPage';
import { useAuth } from 'context/AuthContext';
import { NotAuthNavigationPanel } from 'components/navigation/NotAuthNavigationPanel';
import { ProtectedRoute } from 'components/ProtectedRoute';

function App() {
  const { auth } = useAuth()

  return (
    <>
      <BrowserRouter>
        <LocalizationProvider dateAdapter = { AdapterMoment }>
          {auth ? <NavigationPanel/> : <NotAuthNavigationPanel/>}
          <Routes>
            <Route 
              path='/' 
              element={
                <ActivityPopUpContextProvider>
                  <MainPage/>
                </ActivityPopUpContextProvider>
              }
            />
            <Route element={<ProtectedRoute isAllowed={ auth } children={ null }/>}>
              <Route 
                path='/add-day' 
                element={
                    <AddDayContextProvider>
                      <AddDayPage/>
                    </AddDayContextProvider>
                }
              />
            </Route>
            <Route element={<ProtectedRoute isAllowed={ !auth } children={ null }/>}>
              <Route 
                path="/login" 
                element={ <SignInPage /> }
              />
              <Route 
                path='/register' 
                element= { <SignUpPage/> }
              />
            </Route>
            <Route path='*' element={<div>404 not found</div>}/>
          </Routes>
        </LocalizationProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
