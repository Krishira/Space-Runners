import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Rocks from "./Rocks/Rocks.js";
import Rocks2 from "./Rocks2/Rocks2.js";
import Rocketship from "./Rocketship/Rocketship.js";
import Apple from "./Apple/Apple.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Rocks: new Rocks({
    x: -217.11960451808446,
    y: 130.4947404192905,
    direction: -172.26693822590883,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Rocks2: new Rocks2({
    x: 226.7372446384296,
    y: -167.4342557868127,
    direction: -172.26693822590883,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 3
  }),
  Rocketship: new Rocketship({
    x: -188.12219666142272,
    y: 166.8843511904323,
    direction: -2.228481261187085,
    costumeNumber: 1,
    size: 20,
    visible: true,
    layerOrder: 2
  }),
  Apple: new Apple({
    x: -233,
    y: 176,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
