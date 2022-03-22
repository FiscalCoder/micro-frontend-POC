const config = {
    loader: 'style-loader',
    options: {
        insert: function insertToDOM(ele) {
            const targetHosts = ['#agent-rating', '#agent-overview', '#agent-review-button', '#agent-feedback'].map(id => document.querySelector(id)).filter(host => !!host);
            if (!targetHosts.length === 0) return;
            for (let i = 0; i < targetHosts.length; i++) {
                insertDOM(ele, targetHosts[i]);
            }

            function insertDOM(ele, host) {
                var parent = host.shadowRoot;
                if (!parent) {
                    setTimeout(() => insertDOM(ele, host));
                    return;
                }
                var cln = ele.cloneNode(true);
                // var script = document.createElement("script");
                // script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
                // cln.appendChild(script);
                parent.appendChild(cln);
            }
        }
    }
}


module.exports ={ ...config };