// wolves soundmanager object module
var WolvesSoundManager = function () {

  // model properties
  var soundInstance = undefined;
  var instanceList = undefined;
  var sounds = [];
  var soundsLookup = {};

  // create new sound instance
  // and initialize passing (params),
  // push sound instance into array,
  // create sounds lookup table
  function addSound(params) {
    soundInstance = new SoundInstance();
    soundInstance.initialize(params);
    sounds.push(soundInstance);
    soundsLookup[params.alias] = sounds.length - 1;
  };

  // play a sound instance
  // passing alias through getter
  function play(alias) {
    var soundInstance = getSoundByAlias(alias);
    soundInstance.playSound();
  };

  // a macro function -
  // play all sound instances
  // by iterating through lookup table
  function playAllSounds() {
    var that = this;
    for (var s in soundsLookup) {
      if (soundsLookup.hasOwnProperty(s)) {
        that.play(s);
      }
    }
  };

  // pause a sound instance
  // passing alias through getter
  function pause(alias) {
    var soundInstance = getSoundByAlias(alias);
    soundInstance.pauseSound();
  };

  // a macro function -
  // pause all sound instances
  // by iterating through lookup table
  function pauseAllSounds() {
    var that = this;
    for (var s in soundsLookup) {
      if (soundsLookup.hasOwnProperty(s)) {
        that.pause(s);
      }
    }
  };

  // stop a sound instance
  // passing alias through getter
  function stop(alias) {
    var soundInstance = getSoundByAlias(alias);
    soundInstance.stopSound();
  };

  // a macro function -
  // stop all sound instances
  // by iterating through lookup table
  function stopAllSounds() {
    var that = this;
    for (var s in soundsLookup) {
      if (soundsLookup.hasOwnProperty(s)) {
        that.stop(s);
      }
    }
  };

  // mute a sound instance
  // passing alias through getter
  function mute(alias) {
    var soundInstance = getSoundByAlias(alias);
    soundInstance.muteVolume();
  };

  // a macro function -
  // mute all sound instances
  // by iterating through lookup table
  function muteAllSounds() {
    var that = this;
    for (var s in soundsLookup) {
      if (soundsLookup.hasOwnProperty(s)) {
        that.mute(s);
      }
    }
  };

  // unmute a sound instance
  // passing alias through getter
  function unmute(alias) {
    var soundInstance = getSoundByAlias(alias);
    soundInstance.unmuteVolume();
  };

  // a macro function -
  // unmute all sound instances
  // by iterating through lookup table
  function unmuteAllSounds() {
    var that = this;
    for (var s in soundsLookup) {
      if (soundsLookup.hasOwnProperty(s)) {
        that.unmute(s);
      }
    }
  };

  // fademute a sound instance
  // passing alias through 
  // getter and animating 
  // soundinstance audio level
  function fadeMute(alias, duration, animation, easing) {
    var soundInstance = getSoundByAlias(alias);
    soundInstance.animateVolume('mute', duration, animation, easing);
  };

  // a macro function -
  // fademute all sound instances
  // by iterating through lookup table
  function fadeMuteAllSounds(duration, animation, easing) {
    var that = this;
    for (var s in soundsLookup) {
      if (soundsLookup.hasOwnProperty(s)) {
        that.fadeMute(s, duration, animation, easing);
      }
    }
  };

  // fadeunmute a sound instance
  // passing alias through 
  // getter and animating 
  // soundinstance audio level
  function fadeUnmute(alias, duration, animation, easing) {
    var soundInstance = getSoundByAlias(alias);
    soundInstance.animateVolume('unmute', duration, animation, easing);
  };

  // a macro function -
  // fadeunmute all sound instances
  // by iterating through lookup table
  function fadeUnmuteAllSounds(duration, animation, easing) {
    var that = this;
    for (var s in soundsLookup) {
      if (soundsLookup.hasOwnProperty(s)) {
        that.fadeUnmute(s, duration, animation, easing);
      }
    }

  };

  // adjust volume level
  // passing sound alias
  // through getter and 
  // amount through setter
  function adjustVolume(alias, amount) {
    var soundInstance = getSoundByAlias(alias);
    soundInstance.setVolume(amount);
  };

  // a macro function -
  // adjust all vomume levels
  // by a specified amount
  // iterating through lookup table
  function adjustAllVolume(amount) {
    var that = this;
    for (var s in soundsLookup) {
      if (soundsLookup.hasOwnProperty(s)) {
        that.adjustVolume(s, amount);
      }
    }
  };

  // step volume level
  // passing sound alias
  // through getter and
  // direction parameter
  // to step function
  function stepVolume(alias, direction) {
    var soundInstance = getSoundByAlias(alias);
    soundInstance.stepVolume(direction);
  };

  // a macro function -
  // step all volume levels
  // passing direction parameter
  // to step function, then
  // iterate through lookup
  // table and call step
  // function
  function stepAllVolume(direction) {
    var that = this;
    for (var s in soundsLookup) {
      if (soundsLookup.hasOwnProperty(s)) {
        that.stepVolume(s, direction);
      }
    }
  };

  // get sound instance by alias 
  // from lookup table
  function getSoundByAlias(alias) {
    return sounds[soundsLookup[alias]];
  };

  // add hash to DOM element
  // id attribute to create
  // jquery selector
  function addHash(str) {
    var hash = '#';
    var string = hash.concat(str);
    return string;
  };

  // return public-facing 
  // api, exposing only 
  // html5 audio actions
  return {
    addSound: addSound,
    play: play,
    playAllSounds: playAllSounds,
    pause: pause,
    pauseAllSounds: pauseAllSounds,
    stop: stop,
    stopAllSounds: stopAllSounds,
    mute: mute,
    muteAllSounds: muteAllSounds,
    unmute: unmute,
    unmuteAllSounds: unmuteAllSounds,
    fadeMute: fadeMute,
    fadeMuteAllSounds: fadeMuteAllSounds,
    fadeUnmute: fadeUnmute,
    fadeUnmuteAllSounds: fadeUnmuteAllSounds,
    adjustVolume: adjustVolume,
    adjustAllVolume: adjustAllVolume,
    stepVolume: stepVolume,
    stepAllVolume: stepAllVolume
  }
};

// soundinstance html5 audio function
var SoundInstance = function () {

  // model properties
  this.id = undefined;
  this.classOf = undefined;
  this.alias = undefined;
  this.soundElement = undefined;
  this.soundDomEl = undefined;
  this.volumeLevel = undefined;

  // model properties initialized 
  // passing params hash
  this.initialize = function (params) {
    this.id = params['id'];
    this.classOf = params['classOf'];
    this.alias = params['alias'];
    this.soundElement = {};
    this.soundDomEl = undefined;
    this.volumeLevel = 1;
    this.setSoundId(this.id);
  };

  // play a DOM audio element
  this.playSound = function () {
    this.soundDomEl.play();
  };

  // pause a DOM audio element
  this.pauseSound = function () {
    this.soundDomEl.pause();
  };

  // stop a DOM audio element 
  // and reset playhead
  this.stopSound = function () {
    this.soundDomEl.pause();
    this.soundDomEl.load();
  };

  // set class-level reference to 
  // a DOM audio element passing 
  // id string parameter
  this.setSoundId = function (id) {
    this.soundDomEl = document.getElementById(id);
  };

  // store volume level as model property
  // passing volume level parameter
  this.storeVolume = function (volumeLevel) {
    this.volumeLevel = volumeLevel;
  };

  // set DOM audio element volume level
  // passing volume level parameter
  this.setVolume = function (volume) {
    if (volume > 1) {
      volume = 1;
    } else if (volume < 0) {
      volume = 0;
    }
    this.soundDomEl.volume = volume;
  };

  // volume getter returns sound 
  // instance model property
  this.getVolume = function () {
    return this.volumeLevel;
  };

  // store DOM audio element
  // volume level and set sound 
  // instance volume to zero
  this.muteVolume = function () {
    this.storeVolume(this.soundDomEl.volume);
    this.setVolume(0);
  };

  // unmute DOM audio element by setting
  // volume to stored level, then retrieving 
  // and storing curent volume level 
  this.unmuteVolume = function () {
    this.setVolume(this.getVolume());
    this.storeVolume(this.soundDomEl.volume);
  };

  // fade-mute a DOM audio element
  // passing duration parameter
  // - uses jquery .animate()
  this.fadeMute = function (duration, animation, easing) {
    this.storeVolume(this.soundDomEl.volume);
    var volume = this.soundDomEl.volume;

    var that = this;

    if (animation) {
      $(this.soundDomEl).animate({
        volume: 0
      }, duration, easing);
    } else {
      duration = duration / 10;
      fMute();
    }

    // custom mute function for
    // non-jquery applications
    function fMute() {
      var muteVolume = function () {
        if (that.soundDomEl.volume < 0.1) {
          that.soundDomEl.volume = 0;
          clearInterval(interval);
        } else {
          that.soundDomEl.volume = that.soundDomEl.volume - .10;
        }
      }
      var interval = setInterval(function () {
        if (that.soundDomEl.volume <= 0.1) {
          clearInterval(interval);
        }
        muteVolume();
      }, duration);
    }
  };

  // fade-unmute a DOM audio element
  // passing duration parameter
  // - uses jquery .animate()
  this.fadeUnmute = function (duration, animation, easing) {

    var that = this;

    if (animation) {
      $(this.soundDomEl).animate({
        volume: this.getVolume()
      }, duration, easing);
    } else {
      duration = duration / 10;
      fUnmute();
    }

    // custom unmute function for
    // non-jquery applications
    function fUnmute() {
      var unmuteVolume = function () {
        if (that.soundDomEl.volume > 0.9) {
          that.soundDomEl.volume = 1;
          clearInterval(interval);
        } else {
          that.soundDomEl.volume = that.soundDomEl.volume + .10;
        }
      }

      // poll function until unmuted
      var interval = setInterval(function () {
        if (that.soundDomEl.volume >= that.getVolume()) {
          that.soundDomEl.volume = that.getVolume();
          clearInterval(interval);
        }
        unmuteVolume();
      }, duration);
    }
  },

  // animate sound instance volume level
  // passing direction and duration parameters
  this.animateVolume = function (direction, duration, animation, easing) {
    switch (direction) {
      case "mute":
        this.fadeMute(duration, animation, easing);
        break;
      case "unmute":
        this.fadeUnmute(duration, animation, easing);
        break;
    }
  };

  // step a DOM audio element volume level
  // passing direction string parameter
  this.stepVolume = function (direction) {
    switch (direction) {
      case "up":
        this.setVolume(this.soundDomEl.volume + 0.1);
        break;
      case "down":
        this.setVolume(this.soundDomEl.volume - 0.1);
        break;
    }
  };
}