import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { CommandsPage } from './pages/CommandsPage'
import { InteractivePage } from './pages/InteractivePage'
import { GitPage } from './pages/GitPage'
import { AboutPage } from './pages/AboutPage'
import { AuthPage } from './pages/AuthPage'
// import { NotFoundPagePage } from './pages/NotFoundPagePage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/commands">
          <CommandsPage />
        </Route>
        <Route exact path="/interactive">
          <InteractivePage />
        </Route>
        <Route exact path="/git">
          <GitPage />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/auth">
          <AuthPage />
        </Route>
        <Redirect to="/404" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/commands">
        <CommandsPage />
      </Route>
      <Route exact path="/git">
        <GitPage />
      </Route>
      <Route exact path="/about">
        <AboutPage />
      </Route>
      <Route exact path="/auth">
        <AuthPage />
      </Route>
      <Redirect to="/404" />
    </Switch>
  )
}