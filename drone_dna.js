$(document).ready(function(){
  try{
    var myAudioContext = new webkitAudioContext();
  }
    catch(err){
    alert("this uses the web audio API, try opening it in google chrome \n\n <3 whichlight" );

  }

  'use strict';


  s1 = get_synth(35);
  s2 = get_synth(70);

 // s1.volume.gain.value=0.2;
    $.getJSON("data/paramlist100.txt",function(data){
        $.each(data, function(key, val){
           setTimeout(function(){process_data(val)},key*125);
        });
    });


    function process_data(val){
        var osc1 = remap(val.osc1, 0,100, 30,40);
        var osc2 = remap(val.osc2, 0,100, 30,40);
        var amp1 = remap(val.amp1, 0,100, 0,0.5);
        var amp2 = remap(val.amp1, 0,100, 0,0.5);

        s1.source.frequency.value = osc1;
        s2.source.frequency.value = osc2;
        s1.volume.gain.value = amp1;
        s2.volume.gain.value = amp2;
        console.log(val);
    }

    function remap(val, i1, i2, f1, f2){
        return f1 + (val-i1)*(f2-f1)/(i2-i1);
    }

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
