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
      }
    }).render(true);
  }

  static async moveThing(html) {
    let msg = '';
    const newAngle = parseInt( html.find("#newAngle")[0].value );
    this.movePattern1(newAngle);  
  }

  /* ---------------------------------------------
  // movePattern1: 
    const compass = game.modules.get('compass-for-sequencer')?.api.compass;
    compass.movePattern1(position, extraTime);
  */
  static async movePattern1(angle) {    
      
    // get current angle: pointer_token.document.rotation
    const currentAngle = pointer_token.document.rotation;
    const secondAngle = this.recalcuteAngle(currentAngle, 359);
    const thirdAngle = this.recalcuteAngle(secondAngle, 180);
    
    console.log('====================')
    console.log('====================')
    console.log('====================')
    console.log(currentAngle)
    console.log(secondAngle)
    console.log(thirdAngle)
    
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

} // CLASS END