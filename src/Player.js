class Player {
  constructor(params) {
    const {type, frequency, duration} = params;

    const context = new (window.AudioContext) || window.webkitAudioContext();
    const osc = context.createOscillator();
    const gainControl = context.createGain();

    osc.type = type;
    gainControl.gain.value = 0;
    osc.connect(gainControl);
    gainControl.connect(context.destination);

    osc.frequency.setValueAtTime(frequency, context.currentTime);
    osc.start();

    this.osc = osc;
    this.gainControl = gainControl;
    this.context = context;
  }

  play(frequency, duration) {
    this.osc.frequency.setValueAtTime(frequency, this.context.currentTime);
    this.gainControl.gain.value = 1;
    setTimeout(() => {this.gainControl.gain.value = 0;}, duration);
  }

  on() {
    this.gainControl.gain.value = 1;
  }

  off() {
    this.gainControl.gain.value = 0;
  }

  setFreq(freq) {
    this.osc.frequency.setValueAtTime(freq, this.context.currentTime);
  }
}

const defaultPlayer = new Player({frequency: 440, type: 'sine'});
const sawPlayer = new Player({frequency: 300, type: 'sawtooth'});

