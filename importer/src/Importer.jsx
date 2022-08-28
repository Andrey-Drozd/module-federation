import React, { Suspense } from "react"

const RemoteApp = React.lazy( () => import("exporter/module"))

import ErrorBoundary from "./ErrorBoundary.jsx"

const Importer = () => {
    return (
        <>
            <h1>App-Importer</h1>

            <Suspense fallback="Loading...">
                <ErrorBoundary>
                    <RemoteApp />
                </ErrorBoundary>
            </Suspense>
        </>
    )
}

export default Importer
