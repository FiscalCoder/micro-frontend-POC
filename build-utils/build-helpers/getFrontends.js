const { lazy } = require("react")

const frontend1Container = lazy(() => import(`../../src/frontend-1/index`));
const frontend2Container = lazy(() => import(`../../src/frontend-2/index`));
const frontend3Container = lazy(() => import(`../../src/frontend-3/index`));

console.log(frontend1Container, frontend2Container)
// host name should be the same as the custom component name

const containersAndIDs = {
    frontend1: {
        host: "frontend-1",
        container: frontend1Container
    },
    frontend2: {
        host: "frontend-2",
        container: frontend2Container
    },
    frontend3: {
        host: "frontend-3",
        container: frontend3Container
    }
}

const cacheName = "demoCache"

module.exports = { containersAndIDs, cacheName }