var SPACE_KEY = 32;
var keydown = {
  'left': false,
  'up': false,
  'right': false,
  'down': false,
  'space': false,
  'direction': 'up'
};
var keyMap = {
  32 : 'space',
  37 : 'left',
  65 : 'left',
  38 : 'up',
  87 : 'up',
  39 : 'right',
  68 : 'right',
  40 : 'down',
  83 : 'down'
}

function resetKeyStatus() {
  var direction = keydown['direction'] || '';
  keydown = {
    'left': false,
    'up': false,
    'right': false,
    'down': false,
    'space': false,
    'direction': direction
  }
}

function setKeyStatusDown(e){
  if(keyMap[e.keyCode]){
    if(e.keyCode !== SPACE_KEY){
      keydown.direction = keyMap[e.keyCode];
    }
    keydown[keyMap[e.keyCode]] = true;
  }
}

function setKeyStatusUp(e){
  if(keyMap[e.keyCode]){
    keydown[keyMap[e.keyCode]] = false;
  }
}

if (document.body.addEventListener) {
  //set key status
  document.body.addEventListener('keydown', setKeyStatusDown, false);
  document.body.addEventListener('mousedown', function(){
    setKeyStatusDown({keyCode: 32});
  }, false);
  document.body.addEventListener('touchstart', function(){
    setKeyStatusDown({keyCode: 32});
  }, false);

  //reset key status
  document.body.addEventListener('keyup', setKeyStatusUp, false);
  document.body.addEventListener('touchend', function(){
    setKeyStatusUp({keyCode: 32});
  }, false);
  document.body.addEventListener('mouseup', function(){
    setKeyStatusUp({keyCode: 32});
  }, false);
} else if (el.attachEvent)  {
  document.body.attachEvent('keydown', setKeyStatusDown);
  document.body.attachEvent('keyup', setKeyStatusUp);
}

resetKeyStatus();
