import * as THREE from 'three';
import { EffectComposer, ShockWaveEffect, RenderPass, BloomEffect, EffectPass } from 'postprocessing';

import HopalongVisualizer from './hopalong-visualizer.js'
import CameraManager from './camera-manager';
import config from '../config/configuration';


//let fakeCamera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight );
//fakeCamera.position.z = 5;

/**
 * The Hopalong Manager class is responsible for creating the camera and visualization
 * for Barry's Hopalong Orbits
 */
export default class HopalongManager {
  constructor() {
    this.$container = null;
    this.startTimer = null;
    this.deltaTime = 0;
    this.elapsedTime = 0;
    this.scaleFactor = 1500;
    this.cameraBound = 100;
    this.cameraManager = null;
    this.hopalongVisualizer = null;
    this.renderer = null;
    this.composer = null;
  }

  /**
   *
   * @param {Date} startTimer
   */
  init( startTimer )
  {
    console.log("Hopalong Manager Initialized\n------------");
    this.$container = $('<div></div>');    //jQuery variables are prepended by $
    $( document.body ).append(this.$container);

    this.cameraManager = new CameraManager();
    this.cameraManager.init();

    this.hopalongVisualizer = new HopalongVisualizer();
    this.hopalongVisualizer.init();

    this.startTimer = startTimer;
    this.clock = new THREE.Clock();

    // Setup renderer and effects
    this.renderer = new THREE.WebGLRenderer({
      clearColor: 0x000000,
      clearAlpha: 1,
      antialias: false,
      gammeInput: true,
      gammaOutput: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    $( document.body ).append(this.renderer.domElement);

    // Setup Effects
    this.setupEffects();
    // Setup listeners
    $( document ).mousemove(this.onDocumentMouseMove);
    $( document ).keydown(this.onKeyDown);
    $( window ).resize(this.onWindowResize);
  }

  //SetUp effects
 setupEffects() {
   //setup the composer that renders the effects
   this.composer = new EffectComposer( this.renderer );
   this.composer.addPass( new RenderPass( this.hopalongVisualizer.getScene(), this.cameraManager.getCamera() ) );
   this.bloomEffect = new BloomEffect();
   this.bloomEffect.kernelSize = 0;
   this.composer.addPass( new EffectPass(this.cameraManager.getCamera(), this.bloomEffect ) );

   let fakeCamera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight );
   fakeCamera.position.z = 7;

   this.shockwaveEffect = new ShockWaveEffect( fakeCamera );
   this.shockwaveEffect.renderToScreen = true;
   this.shockwaveEffect.size = 2;//audioData.peak.value * 2;
   this.shockwaveEffect.extent = 10;//audioData.peak.value * 100;
   this.shockwaveEffect.waveSize = 10;//(audioData.peak.value / 1) * 2;
   this.shockwaveEffect.amplitude = 1;
   this.composer.addPass( this.shockwaveEffect );

   this.clock = new THREE.Clock();
 }

  /**
   *
   * @param {number} deltaTime
   * @param {AudioAnalysedDataForVisualization} audioData
   */
  update( deltaTime, audioData )
  {
      this.deltaTime = deltaTime;
      this.elapsedTime += deltaTime;

      this.shockwaveEffect.speed = .3;//(hopalongVisualizer.getSpeed() / 80) + audioData.peak.value + .25;
      this.shockwaveEffect.size = 2;//audioData.peak.value * 2;
      this.shockwaveEffect.extent = 10;//audioData.peak.value * 100;
      this.shockwaveEffect.waveSize = 10;//(audioData.peak.value / 1) * 2;
      this.shockwaveEffect.amplitude = .25;

      this.hopalongVisualizer.update( deltaTime, audioData, this.renderer, this.cameraManager );

      if ( config.effects.glow.value ) {
        this.bloomEffect.intensity = audioData.peak.value * audioData.peak.energy;
      }

      if ( audioData.peak.value > 0.8 && config.effects.shockwave.value ) {
        this.shockwaveEffect.explode();
      }
      this.composer.render( this.clock.getDelta() );

      this.cameraManager.manageCameraPosition();
  }

  ///////////////////////////////////////////////
  // Event listeners
  ///////////////////////////////////////////////
  onDocumentMouseMove = (event) => {
    this.cameraManager.updateMousePosition(event);
  }

  onWindowResize = (event) => {
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.cameraManager.onResize();
  }

  onKeyDown = (event) => {
    if (event.keyCode == 38 && config.user.speed.value < config.user.speed.max)
        config.user.speed.value += 0.5;
    else if (event.keyCode == 40 && config.user.speed.value > config.user.speed.min)
      config.user.speed.value -= 0.5;
    else if (event.keyCode == 37 && config.user.rotationSpeed.value < config.user.rotationSpeed.max)
     config.user.rotationSpeed.value += 0.25;
    else if (event.keyCode == 39 && config.user.rotationSpeed.value > config.user.rotationSpeed.min)
      config.user.rotationSpeed.value -= 0.25;
    //else if (event.keyCode == 72 || event.keyCode == 104) toggleVisuals();
  }
};
