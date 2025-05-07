import "./styles/tailwind/utility.css";
import "./styles/tailwind/typography.css";
import "./styles/tailwind/tailwind.css";

import { mount } from "svelte";
import App from "./App.svelte";

let app;
let tgt = document.getElementById("proj-container");
tgt.innerHTML = "";

try {
    mount(App, {
        target: document.getElementById("proj-container"),
    });
    let grafs = document.getElementsByClassName("article-body-rich-text");
    while (grafs.length > 0) {
        grafs[0].parentNode.removeChild(grafs[0]);
    }
} catch {
    app = undefined;
}

setInterval(() => {
    let tgt = document.getElementById("proj-container");
    if (tgt.innerHTML === "") {
        if (app) app.$destroy();
        try {
            mount(App, {
                target: document.getElementById("proj-container"),
            });
        } catch {
            app = undefined;
        }
    }
}, 500);

export default app;
