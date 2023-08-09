const moduleName = 'compass-for-sequencer';
//import {Compass} from './compass.js'


Hooks.once('init', () => {
//Hooks.once('setup', () => {
  // --------------------------------------------------
  // Load API
  // Request with: const compass = game.modules.get('compass-for-sequencer')?.api.compass;
  //game.modules.get('compass-for-sequencer').api = { compass }; 
  //game.modules.get('compass-for-sequencer').api = { compass: Compass };
  
  console.log('==========================')
  console.log('Compass',  {
    module: game.modules.get('compass-for-sequencer')
  });
  console.log('==========================')
  
  // --------------------------------------------------
  // Module Options

});




