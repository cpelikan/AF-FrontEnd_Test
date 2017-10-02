
function initExercise(list, canvas){
  exercise = new Exercise(list, canvas);
}

  var Exercise = (function(list, canvasID){

  //items can i put in canvas
  var choisesList = document.querySelectorAll('#'+list+" a");

  // init canvas
  var canvas = new fabric.Canvas(canvasID);
  
  //init rows for snap
  var rows = canvas.height/choisesList.length;
  var padding = 10;

  var avaibleSetPlace = [];  

  // draw line to snap
  function drawZones(){
    
    for (var i = 0; i < (canvas.height / rows); i++) {
      addSquare(i);
    }
  }
  drawZones();
  //console.log(avaibleSetPlace)
  
  // get all option and set visible
  function resetOptionList(){   

    [].forEach.call(choisesList, function (item) {
      item.className = item.parentNode.style.display = 'block';
    });
  }


  function addSquare (i){
    var newItem = new fabric.Rect({
      left: 0,
      top:  i * rows,
      width: canvas.width-2,
      height :rows-padding*2,
      fill: 'rgba(255,255,255,.5)',
      stroke : 'rgba(255,255,255,1)',
      strokeWidth: 1,
      selectable: false
    });
    //console.log("addSquare", avaibleSetPlace);
    avaibleSetPlace.push(i * rows);
    canvas.add(newItem);
  }


  // ### HANDLERS
  function handleDragStart(evt) {

    // add property needed for firefox
    if(detectFirefox())
      evt.dataTransfer.setData('text/plain', evt.target.id);

    [].forEach.call(itemsList, function (item) {
    //item.classList.remove('dragging');
    item.className = item.className.replace('dragging', '');
  });
  //this.classList.add('dragging');
  this.className += ' dragging';
}

function handleDragOver(evt) {

  if (evt.preventDefault) {
    evt.preventDefault(); 
  } 

  evt.dataTransfer.dropEffect = 'copy'; 


  return false;
}

function handleDragEnter(evt) {
  this.className += ' over';
}

function handleDragLeave(evt) {
  this.className = this.className.replace('over' , '');
}

function handleDrop(evt) {

  if (evt.stopPropagation) {
    evt.stopPropagation();
  }

  var item = document.querySelector('#list .dragging');

  var bg = new fabric.Rect({
    fill: '#FFF',
    scaleY: 0.5,
    originX: 'center',
    originY:'center',
    width: canvas.width-2,
    height :rows+padding*3
  });

  var text = new fabric.Textbox("  "+item.innerHTML, {
    fontFamily: 'Arial',
    fontSize :20,
    fill: '#396781',
    originX: 'center',
    originY:'center',
    textAlign:'left',
    width: canvas.width-2
  });

  var group = new fabric.Group([bg, text ], {
    left: evt.layerX,
    top: evt.layerY,
    hasControls:false

  });

  canvas.add(group);

  item.parentNode.style.display='none';

  return false;
}

function handleDragEnd(evt) {

  [].forEach.call(itemsList, function (item) {
    item.className = item.className.replace('dragging' , '');
  });
}

function positioningItem(options){

  var topPosition = Math.round(options.target.top / rows) * rows;

  function takePosition(position){

    if(avaibleSetPlace.indexOf(position) > -1)
      avaibleSetPlace.splice(avaibleSetPlace.indexOf(position), 1);  

    return options.target.set({
      left: 0,
      top: position
    });

  }

  // the position is free
  if(avaibleSetPlace.indexOf(topPosition) > -1)
    return takePosition(topPosition);
  

  //looking for avaible position
  for (var i = 0; i < avaibleSetPlace.length; i++) {
    if(avaibleSetPlace.indexOf(avaibleSetPlace[i]) > -1)
      return takePosition(avaibleSetPlace[i]);   
  }

  
}



function resetExercise(){
  canvas.clear();
  resetOptionList();
  avaibleSetPlace = [];
  drawZones();
}

  // set event listner to element of list
  var itemsList = document.querySelectorAll('#list a');
  [].forEach.call(itemsList, function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
  
  // Bind the event listeners for the canvas
  var canvasContainer = document.getElementById(canvasID).parentNode;
  
  canvasContainer.addEventListener('dragenter', handleDragEnter, false);
  canvasContainer.addEventListener('dragover', handleDragOver, false);
  canvasContainer.addEventListener('dragleave', handleDragLeave, false);
  canvasContainer.addEventListener('drop', handleDrop, false);  

  //temporary commented on DOM 
  document.getElementById('btnResetExercise').addEventListener('click', resetExercise, false);

  canvas.on('object:added', function(options) { 
    //check if is option list item
    //console.log("added" ,options); 
    if(options.target._objects)
      positioningItem(options);
  });


  document.getElementById('btnContinue').addEventListener('click', submitExercise, false);

  // fake method
  function submitExercise(){
   var dropped = [], 
   panelToShow;

    // check id all options is dragged     
    [].forEach.call(choisesList, function (item) {
      if(item.offsetParent === null )
        dropped.push(item);
    });      

    panelToShow = (dropped.length ==  choisesList.length) ? 'feedback' : 'warning';
    //console.log(panelToShow, dropped.length, choisesList.length)
    document.getElementById(panelToShow).className += ' open'; 
  }

});


