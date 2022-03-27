
function App() {
    return (<>
        <div>
            Demo POC Fronted-1
        </div>
    </>)
}


import React from 'react';

import initShadowDOMAndRender from "../../build-utils/build-helpers/initShadowDOM"
let host = "frontend-1"

initShadowDOMAndRender(host, App);
