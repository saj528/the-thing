module.exports.interactBox = function interactBox() {
  eKey = this.input.keyboard.on('keydown_E')
  if (eKey.isDown){
    console.log('The Chode Abode');
  };
}