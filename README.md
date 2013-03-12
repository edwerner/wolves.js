=======
wolves.js
=========

A super-lightweight HTML5 audio library with a minimalistic toolset

## Documentation
Full framework documentation can be found here:

http://wolves-docs.herokuapp.com/

## Usage Example

 ```javascript
  // create new sound manager instance
  var soundManager = new WolvesSoundManager();
    
  // add new sound passing params object
  soundManager.addSound({ 
    'id': 'audio_01', 
    'class': 'demo-audio', 
    'alias': 'WOLVES_DEMO_AUDIO' 
  });

  // control sound instance using 'alias' param
  soundManager.play('WOLVES_DEMO_AUDIO');
 ```
 
## Quickstart Guide
 
 ```html
<!DOCTYPE HTML>
<html>
  <head>
    <title>wolves.js quickstart guide</title>
  </head>
  <body>
    <!-- audio courtesy of http://www.noiseaddicts.com/ -->
    <audio id="audio_01" class="demo-audio" name="WOLVES_DEMO_AUDIO" preload="auto" autobuffer="autobuffer">
      <source src="http://www.noiseaddicts.com/samples/181.mp3" type="audio/mp3">
    </audio>
    <!-- link javascripts -->
    <script src="jquery-1.9.1.min.js"></script>
    <script src="wolves-1.0.min.js"></script>
    <script>
      // create new sound manager instance
      var soundManager = new WolvesSoundManager();

      // create local params hash
      var audioParams = {
        'id': 'audio_01', // audio id
        'class': 'demo-audio', // audio class
        'alias': 'WOLVES_DEMO_AUDIO' // audio alias
      };

      // add new sound instance to sound manager
      // passing in params hash
      soundManager.addSound(audioParams);

      // create button and bind click event
      // passing sound alias as a parameter
      $('<button/>')
        .text('play audio')
        .appendTo('body')
        .bind('click', function () {
        soundManager.play('WOLVES_DEMO_AUDIO');
      });
    </script>
  </body>
</html>
 ```
