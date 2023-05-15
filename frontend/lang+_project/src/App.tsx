import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { MainPage } from 'pages/MainPage';
import { DayPage } from 'pages/DayPage';
import { SignInPage } from "pages/SignInPage"

import { DayContextProvider } from 'context/DayContext';
import { ActivityPopUpContextProvider } from 'context/ActivityPopUpContext';

import { NavigationPanel } from 'components/navigation/NavigationPanel';
import { SignUpPage } from 'pages/SignUpPage';
import { useAuth } from 'context/AuthContext';
import { NotAuthNavigationPanel } from 'components/navigation/NotAuthNavigationPanel';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { TournamentGridPage } from 'pages/TournamentGridPage';
import { SportsPage } from 'pages/SportsPage';
import { SportsContextProvider } from 'context/SportsContext';
import { TeamsKidsPage } from 'pages/TeamsKidsPage';
import { TeamsPresentation } from 'pages/TeamsPresentationPage';

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
            <Route 
              path='/grid' 
              element={
                <TournamentGridPage/>
              }
            />
            <Route 
              path='/teamsshow' 
              element={
                <TeamsPresentation/>
              }
            />
            <Route element={<ProtectedRoute isAllowed={ auth } children={ null }/>}>
              <Route 
                path='/day' 
                element={
                    <DayContextProvider>
                      <DayPage/>
                    </DayContextProvider>
                }
              />
              <Route 
                path='/sports' 
                element={
                    <SportsContextProvider>
                      <SportsPage/>
                    </SportsContextProvider>
                }
              />
              <Route 
                path='/teams' 
                element={
                  <TeamsKidsPage/>
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
