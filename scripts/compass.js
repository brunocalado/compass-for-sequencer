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
    const newangle = parseInt( html.find("#newangle")[0].value );
    movePattern1(newangle);  
  }

  /* ---------------------------------------------
  // movePattern1: 
    const compass = game.modules.get('compass-for-sequencer')?.api.compass;
    compass.movePattern1(position, extraTime);
  */
  static async movePattern1(angle) {    

    let sequence = new Sequence()
      .animation()
        .on(tokenD)
        .rotateIn(0, 2500, {ease: "easeInOutBounce"})    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
        .rotateIn(90, 1500, {ease: "easeInOutBounce"})    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
        .rotateIn(180, 2500, {ease: "easeInOutBounce"})    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
        .rotateIn(360, 2500, {ease: "easeInOutBounce"})    // .rotateIn(degrees, duration, options)

    await sequence.play();
    
    let sequence = new Sequence()
      .animation()
          .on(tokenD)
          .rotateIn(angle, 2500, {ease: "easeOutCubic"})    // .rotateIn(degrees, duration, options)
          .waitUntilFinished()

    await sequence.play();
  
  }

} // CLASS END