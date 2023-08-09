const moduleName = 'compass-for-sequencer';
import {Compass} from './compass.js'


//Hooks.once('init', () => {
Hooks.once('setup', () => {
  // --------------------------------------------------
  // Load API
  // Request with: const compass = game.modules.get('compass-for-sequencer')?.api.compass;
  //game.modules.get('compass-for-sequencer').api = { compass }; 
  game.modules.get('compass-for-sequencer').api = { compass: Compass };

  
  // --------------------------------------------------
  // Module Options

});




