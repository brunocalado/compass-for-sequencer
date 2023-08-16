const moduleName = 'compass-for-sequencer';
let pointer_token;
      
// const compass = game.modules.get('compass-for-sequencer')?.api.compass;
export class Compass {

  /* ---------------------------------------------
  // main: 
    const compass = game.modules.get('compass-for-sequencer')?.api.compass;
    compass.main();
  */
  static async main() {
    if (canvas.tokens.controlled[0] === undefined) {
      ui.notifications.error("You must select a token!");
      return;
    } else {
      pointer_token = canvas.tokens.controlled[0];
    }

    const newAngle=0;    
    const templateData = {
      newAngle: newAngle
    };

    const template = await renderTemplate(`modules/compass-for-sequencer/templates/main_dialog.html`, templateData);

    new Dialog({
      title: `Compass`,
      content: template,
      buttons: {
        ok: {
          label: "Move",
          callback: async (html) => {
            this.moveThing(html);
          },
        },
        cancel: {
          label: "Cancel",
        }
      },
      default: 'ok', // Define o botão "Move" como o botão padrão
    }).render(true);
  }

  static async moveThing(html) {
    let msg = '';
    const newAngle = parseInt( html.find("#newAngle")[0].value );
    this.movePattern1(newAngle);  
  }

  /* ---------------------------------------------
  // movePattern1: simple movement
    const compass = game.modules.get('compass-for-sequencer')?.api.compass;
    compass.movePattern1(angle);
  */
  static async movePattern1(angle) {    
      
    // get current angle: pointer_token.document.rotation
    const targetAngle = parseInt(angle);
    
    if (true) { // DEBUG
      const startingAngle = pointer_token.document.rotation;
      console.log('=====================================');
      console.log('angle:' + angle);
      console.log('angle:' + `${parseInt(angle)-50}` );
      console.log('startingAngle:' + startingAngle);
      console.log('=====================================');
    }

    // Rotate 
    // randomInt(min, max)
    const easingOne = {ease: "easeInSine"};
    const easingTwo = {};
    const easingThree = {ease: "easeOutSine"};     
    new Sequence()
      .animation()
        .on(pointer_token)
        .rotateIn(angle-50-this.randomInt(1, 10), 1500, easingOne)    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()    
      .animation()
        .on(pointer_token)
        .rotateIn(angle+50+this.randomInt(1, 10), 1500, easingOne)    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
      .animation()
        .on(pointer_token)
        .rotateIn(angle-30-this.randomInt(1, 10), 1000, easingTwo)    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
      .animation()
        .on(pointer_token)
        .rotateIn(angle+30+this.randomInt(1, 10), 1000, easingTwo)    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
      .animation()
        .on(pointer_token)
        .rotateIn(angle-10-this.randomInt(1, 10), 500, easingThree)    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
      .animation()
        .on(pointer_token)
        .rotateIn(angle+10+this.randomInt(1, 10), 500, easingThree)    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
      .animation()
        .on(pointer_token)
        .rotateIn(angle, 500, easingThree)       // .rotateIn(degrees, duration, options)
        .waitUntilFinished()           
      .play();
  
  }

  /* ---------------------------------------------
  // movePattern2: simple movement with shake at the end
    const compass = game.modules.get('compass-for-sequencer')?.api.compass;
    compass.movePattern2(angle);
  */
  static async movePattern2(angle) {    
      
    // get current angle: pointer_token.document.rotation
    const currentAngle = pointer_token.document.rotation;
    const secondAngle = this.recalcuteAngle(currentAngle, 359);
    const thirdAngle = this.recalcuteAngle(secondAngle, 180);

    let sequence = new Sequence()
      .animation()
        .on(pointer_token)
        .rotateIn(secondAngle, 2500)    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
        .rotateIn(thirdAngle, 1500)    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()

    await sequence.play();
    
    sequence = new Sequence()
      .animation()
          .on(pointer_token)
          .rotateIn(angle, 2500)    // .rotateIn(degrees, duration, options)
          .waitUntilFinished()

    await sequence.play();
  
  }

  static recalcuteAngle(angle, newAngleToAdd) {
    const newAngle = (angle + newAngleToAdd) % 360;
    return newAngle >= 0 ? newAngle : newAngle + 360;
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

} // CLASS END