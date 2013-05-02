$(document).ready(function(){
  try{
    var myAudioContext = new webkitAudioContext();
  }
    catch(err){
    alert("this uses the web audio API, try opening it in google chrome \n\n <3 whichlight" );

  }


  'use strict';


  s1= get_synth(35);
  s2=get_synth(35.5);
 s3=get_synth(36);


    function get_synth(pitch){
        nodes={};
        nodes.source = myAudioContext.createOscillator();
        nodes.source.type=3;
        nodes.filter = myAudioContext.createBiquadFilter();
        nodes.volume = myAudioContext.createGainNode();
        nodes.filter.type=0; //0 is a low pass filter
        nodes.volume.gain.value = 1;
        nodes.source.connect(nodes.filter);
        nodes.filter.connect(nodes.volume);


        nodes.volume.connect(myAudioContext.destination);


        //pitch val
        nodes.source.frequency.value=pitch;

        //frequency val
        nodes.filter.frequency.value=100;
        nodes.source.noteOn(0);
        return nodes
    }



});
