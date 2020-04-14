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

var xDown = null, yDown = null, xUp, yUp;
var handleTouchMove = function(event) {
  if ( ! xDown || ! yDown ) {
    return;
  }

  var xUp = event.touches[0].clientX;
  var yUp = event.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if(Math.abs(xDiff) > 5){
    if ( xDiff > 0) {
      setKeyStatusDown({keyCode: 37});
    } else {
      setKeyStatusDown({keyCode: 39});
    }
  }
  if(Math.abs(yDiff) > 5){
    if ( yDiff > 0) {
      setKeyStatusDown({keyCode: 38});
    } else {
      setKeyStatusDown({keyCode: 40});
    }
  }
  /* reset values */
  xUp = xDown;
  yUp = yDown;
};

function bindKeyEvents(){
  if (document.body.addEventListener) {
    //set key status

    document.body.addEventListener('keydown', setKeyStatusDown, false);
    document.body.addEventListener('mousedown', function(){
      setKeyStatusDown({keyCode: 32});
    }, false);
    document.body.addEventListener('click', function(event){
      setKeyStatusDown({keyCode: 32});
      setTimeout(function(){
        setKeyStatusUp({keyCode: 32});
      }, 50);
    }, false);

    document.body.addEventListener('touchstart', function(event){
      xDown =  event.touches[0].clientX;
      yDown =  event.touches[0].clientY;
    }, false);
    document.body.addEventListener('touchmove', function(event){
      handleTouchMove(event);
    }, false);

    //reset key status
    document.body.addEventListener('keyup', setKeyStatusUp, false);
    document.body.addEventListener('touchend', function(event){
      resetKeyStatus();
    }, false);
    document.body.addEventListener('mouseup', function(){
      setKeyStatusUp({keyCode: 32});
    }, false);
  } else if (el.attachEvent)  {
    document.body.attachEvent('keydown', setKeyStatusDown);
    document.body.attachEvent('keyup', setKeyStatusUp);
  }
}

resetKeyStatus();
