
function App() {
    return (<>
        <div>
            Demo POC Fronted-2
        </div>
    </>)
}

import React from 'react';

import initShadowDOMAndRender from "../../build-utils/build-helpers/initShadowDOM"
let host = "frontend-2"

initShadowDOMAndRender(host, App);