/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Rocks2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("53286-middle", "./Rocks2/costumes/53286-middle.png", {
        x: 42,
        y: 35
      })
    ];

    this.sounds = [new Sound("pop", "./Rocks2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      ),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];
  }

  *startAsClone() {
    this.visible = true;
    for (let i = 0; i < 4; i++) {
      yield* this.glide(3, this.random(-240, 240), this.random(-180, 180));
      yield;
    }
    yield* this.glide(3, -230, 160);
    this.visible = false;
  }

  *whenIReceiveMessage1() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }

  *whenIReceiveStart() {
    this.stage.vars.myVariable = 15;
    this.visible = false;
    while (true) {
      this.createClone();
      yield* this.wait(this.toNumber(this.stage.vars.myVariable));
      this.stage.vars.myVariable +=
        this.toNumber(this.stage.vars.myVariable) / -15;
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      if (this.stage.costumeNumber === 2) {
        this.deleteThisClone();
      }
      yield;
    }
  }
}
