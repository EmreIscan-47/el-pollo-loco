class SoundManager {
  sounds;
  soundMute;
  constructor() {
    this.sounds = {};
    this.lastPlayed = {};
    this.cooldown = 1000;
  }

  load(name, url) {
    const audio = new Audio(url);
    this.sounds[name] = audio;
  }

  play(name, volume = 1.0, loop = false) {
    const now = Date.now();
    if (!this.soundMute) {
      if (
        this.lastPlayed[name] &&
        now - this.lastPlayed[name] < this.cooldown &&
        !loop
      ) {
        return;
      }
      this.lastPlayed[name] = now;
      const url = this.sounds[name];
      if (url) {
        const audio = new Audio(url.src);
        audio.volume = volume;
        audio.loop = loop;
        audio.play().catch(() => {});
        return audio;
      }
    }
  }

  setVolume(name, volume) {
    const sound = this.sounds[name];
    if (sound) {
      sound.volume = volume;
    }
  }

  pause(name) {
    const sound = this.sounds[name];
    if (sound) {
      sound.pause();
    }
  }
}
