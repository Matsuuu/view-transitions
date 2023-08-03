import { Suunta } from "suunta";
import { BallView } from "../views/ball-view.js";
import { BlockView } from "../views/block-view.js";
import { GemView } from "../views/gem-view.js";
import { RectangleView } from "../views/rectangle-view.js";

/**
 * @type { import("suunta").Route[] }
 * */
const routes = [
    {
        path: "/",
        name: "Ball",
        view: BallView
    },
    {
        path: "/block",
        view: BlockView
    },
    {
        path: "/gem",
        view: GemView
    },
    {
        path: "/rectangle",
        view: RectangleView
    }
];
/*
            <li><a href="/">Ball</a></li>
            <li><a href="/block">Block</a></li>
            <li><a href="/gem">Gem</a></li>
            <li><a href="/rectangle">Rectangle</a></li>
*/

/**
 * @type { import("suunta").SuuntaInitOptions }
 * */
const options = {
    routes
}

export const router = new Suunta(options);

// Add view transitions
// @ts-ignore
const actualRenderer = router.options.renderer;
// @ts-ignore
router.options.renderer = (...args) => {
    // @ts-ignore
    if (!document.startViewTransition) {
        actualRenderer(...args);
        return;
    }
    // @ts-ignore
    document.startViewTransition(() => actualRenderer(...args));
}