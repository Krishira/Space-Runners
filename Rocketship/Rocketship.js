/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Rocketship extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("rocketship-a", "./Rocketship/costumes/rocketship-a.svg", {
        x: 92.15059579024538,
        y: 65.11189708046592
      })
    ];

    this.sounds = [
      new Sound("space ripple", "./Rocketship/sounds/space ripple.wav"),
      new Sound("laser1", "./Rocketship/sounds/laser1.wav"),
      new Sound("laser2", "./Rocketship/sounds/laser2.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart2)
    ];
  }

  *whenGreenFlagClicked() {
    this.broadcast("start");
  }

  *whenIReceiveStart() {
    this.stage.costume = "backdrop1";
    this.goto(0, 0);
    this.visible = true;
    this.size = 20;
    while (true) {
      /* TODO: Implement motion_ifonedgebounce */ null;
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      this.direction += this.random(-5, 5);
      this.move(5);
      yield;
    }
  }

  *whenIReceiveStart2() {
    while (true) {
      if (
        this.touching(this.sprites["Rocks"].andClones()) ||
        this.touching(this.sprites["Rocks2"].andClones())
      ) {
        this.broadcast("message1");
        this.visible = false;
        this.stage.costume = "next backdrop";
      }
      yield;
    }
  }
}
