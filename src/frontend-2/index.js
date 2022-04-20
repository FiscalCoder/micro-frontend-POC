
function App() {
    return (<>
        <div className="p-3 mb-2 bg-red container">
            Demo POC Fronted-2
        </div>
    </>)
}

import React from 'react';

import initShadowDOMAndRender from "../../build-utils/build-helpers/initShadowDOM"
let host = "frontend-2"

initShadowDOMAndRender(host, App);
