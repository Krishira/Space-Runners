/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Rocks extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Rocketship-c", "./Rocks/costumes/Rocketship-c.svg", {
        x: 32.20176489680557,
        y: 21.977821652031025
      })
    ];

    this.sounds = [new Sound("pop", "./Rocks/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      ),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart)
    ];
  }

  *startAsClone() {
    while (true) {
      if (this.stage.costumeNumber === 2) {
        this.deleteThisClone();
      }
      yield;
    }
  }

  *startAsClone2() {
    this.visible = true;
    for (let i = 0; i < 150; i++) {
      this.direction = this.radToScratch(
        Math.atan2(
          this.sprites["Rocketship"].y - this.y,
          this.sprites["Rocketship"].x - this.x
        )
      );
      this.move(5);
      yield* this.wait(0.05);
      yield;
    }
    this.direction = this.radToScratch(
      Math.atan2(
        this.sprites["Apple"].y - this.y,
        this.sprites["Apple"].x - this.x
      )
    );
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
}
