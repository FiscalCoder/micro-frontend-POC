import { lazy } from "react"

const nested1Container = lazy(() => import(`./src/nested-1/App.js`));
const nested2Container = lazy(() => import(`./src/nested-2/App.js`));
const nested3Container = lazy(() => import(`./src/nested-3/App.js`));

// host name should be the same as the custom component name

const containersAndIDs = {
    nested1: {
        host: "nested-micro-1",
        container: nested1Container
    },
    nested2: {
        host: "nested-micro-2",
        container: nested2Container
    },
    nested3: {
        host: "nested-micro-3",
        container: nested3Container
    },
}

const cacheName = "agentPerfMgmt"

module.exports = { containersAndIDs, cacheName }