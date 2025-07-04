/**
 * Manages all game sounds, including loading, playing, pausing, and muting.
 *
 * @class
 */
class SoundManager {
  /**
   * Stores loaded sounds, keyed by their name.
   * @type {Object.<string, HTMLAudioElement>}
   */
  sounds;

  /**
   * Indicates if all sounds are muted.
   * @type {boolean}
   */
  soundMute;

  /**
   * Stores the last played timestamp for each sound.
   * @type {Object.<string, number>}
   */
  lastPlayed;

  /**
   * Minimum time (in ms) between playing the same sound again (to prevent spam).
   * @type {number}
   * @default 1000
   */
  cooldown;

  /**
   * Creates a new SoundManager instance and initializes sound storage.
   *
   * @constructor
   */
  constructor() {
    this.sounds = {};
    this.lastPlayed = {};
    this.cooldown = 1000;
  }

  /**
   * Loads a sound file and stores it by name.
   *
   * @param {string} name - The unique name for the sound.
   * @param {string} url - The URL/path to the audio file.
   */
  load(name, url) {
    const audio = new Audio(url);
    this.sounds[name] = audio;
  }

  /**
   * Plays a sound by name, with optional volume and looping.
   * Applies a cooldown to prevent rapid replay unless looping.
   *
   * @param {string} name - The name of the sound to play.
   * @param {number} [volume=1.0] - The volume (0.0 to 1.0).
   * @param {boolean} [loop=false] - Whether the sound should loop.
   * @returns {HTMLAudioElement|undefined} The Audio object if played, otherwise undefined.
   */
  play(name, volume = 1.0, loop = false) {
    const now = Date.now();
    if (!this.soundMute) {
      if (this.lastPlayed[name] && now - this.lastPlayed[name] < this.cooldown && !loop) {
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

  /**
   * Sets the volume for a specific sound.
   *
   * @param {string} name - The name of the sound.
   * @param {number} volume - The volume (0.0 to 1.0).
   */
  setVolume(name, volume) {
    const sound = this.sounds[name];
    if (sound) {
      sound.volume = volume;
    }
  }

  /**
   * Pauses a specific sound if it is currently playing.
   *
   * @param {string} name - The name of the sound to pause.
   */
  pause(name) {
    const sound = this.sounds[name];
    if (sound) {
      sound.pause();
    }
  }
}
