import { Suspense } from 'react';
import { render } from 'react-dom';
// import { cacheName } from './componentPath';

const getClass = (hostId, Element) => {
    const shadowRoots = new WeakMap();

    return (
        class InitiateClass extends HTMLElement {
            constructor() {
                super();
                const mountPoint = document.createElement('span');
                const shadowRoot = this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
                shadowRoots.set(this, shadowRoot);

                render(<Suspense fallback={<div>Loading...</div>}>
                    <div id="demo-poc">
                        <Element />
                    </div>
                </Suspense>, mountPoint);
            }

            connectedCallback() {
                const shadowRoot = shadowRoots.get(this);
                window.agentPerfMgmt = {}
                window.agentPerfMgmt["demo-poc"] = shadowRoot

                // Shadow DOM doesn't allow inject styles from external sources. Need to import it right here.
                let style = document.createElement('style');
                style.type = 'text/css';
                shadowRoot.appendChild(style);
                let bootstrapStyle = require('!!raw-loader!sass-loader!../../public/css/custom-bootstrap.scss').default;
                let moduleStyle = require('!!raw-loader!sass-loader!../../public/css/index.scss').default;
                // let fontsStyle = require('!!raw-loader!file-loader!sass-loader!../../public/css/fonts.scss').default;

                // console.log("fonts",fontsStyle)
                style.appendChild(document.createTextNode(moduleStyle));
                style.appendChild(document.createTextNode(bootstrapStyle));
                // style.appendChild(document.createTextNode(fontsStyle));


                let scriptDOM = document.createElement('script');
                let bootstrapScript = require('!!raw-loader!../../public/js/bootstrap.bundle.min.js').default;
                scriptDOM.appendChild(document.createTextNode(bootstrapScript));
                shadowRoot.appendChild(scriptDOM);

            }
        }
    )

}


const initShadowDOMandRender = (hostId, Element) => {
    const InitiateClass = getClass(hostId, Element);
    customElements.define(hostId, InitiateClass);
}

export default initShadowDOMandRender;