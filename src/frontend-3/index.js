import initShadowDOMAndRender from "../../build-utils/build-helpers/initShadowDOM"
import { containersAndIDs } from "./nested-micro-fe-path"

for (const key in containersAndIDs) {
    if (Object.hasOwnProperty.call(containersAndIDs, key)) {
        const element = containersAndIDs[key];
        initShadowDOMAndRender(element.host, element.container);
    }
}

