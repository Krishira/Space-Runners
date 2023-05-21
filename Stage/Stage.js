/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 427.00473,
        y: 339.980275
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", {
        x: 427.0046500000002,
        y: 339.9803149999999
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      )
    ];

    this.vars.myVariable = 15;
  }

  *whenIReceiveMessage1() {
    while (!this.keyPressed("r")) {
      yield;
    }
    this.costume = "previous backdrop";
    yield* this.broadcastAndWait("start");
  }
}
