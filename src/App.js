import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from 'layouts/Layouts'
import { Loading } from 'components'
import routes from 'router/Router'

const NotFound = lazy(() => import('views/NotFound'))

const App = () => {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            return (
                <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                    exact
                />
            )
        })
    }
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Layout>
                    <Switch>
                        {getRoutes(routes)}
                        <Route component={NotFound} path="*" />
                    </Switch>
                </Layout>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
