function startAllAudio() {
  if (!audioStarted) {
    audioStarted = true;

    bgMusic.setVolume(0.2);
    bgMusic.loop();
    bgMusic.jump(0.70);

    windSound.setVolume(0.05);
    windSound.loop();
  }
}