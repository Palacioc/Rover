var rover1 = {
  position: [5, 0],
  direction: 'N'
};

var rover2 = {
  position: [9, 5],
  direction: 'W'
};

//Matriz:
var grid = new Array(10);
for(var i=0;i<10;i++){
  grid[i]=new Array(10);
}
//Obstaculos
grid[9][2]=1;
grid[2][0]=1;
grid[2][6]=1;
grid[3][9]=1;
grid[4][0]=1;

//Message
var message ="lfffffffff";
//mensaje en el que ambos rovers encuentran obstaculos: lfffffff
//mensaje en el que rover1 choca con rover2 fffffff

//Funciones de movimiento. Reciben el objeto con la pos. actual y escriben en el objeto la nueva posicion.
function goForward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[1]++;
      break;
    case 'E':
      rover.position[0]++;
      break;
    case 'S':
      rover.position[1]--;
      break;
    case 'W':
      rover.position[0]--;
      break;
  }
  //wrap horizontal
  if (rover.position[0]===10) {
    rover.position[0]=0;
  } else if (rover.position[0]===-1) {
    rover.position[0]=9;
  }
  //wrap vertical
  if (rover.position[1]===10) {
    rover.position[1]=0;
  } else if (rover.position[1]===-1) {
    rover.position[1]=9;
  }
}

function goBackwards(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[1]--;
      break;
    case 'E':
      rover.position[0]--;
      break;
    case 'S':
      rover.position[1]++;
      break;
    case 'W':
      rover.position[0]++;
      break;
  }
  //wrap horizontal
  if (rover.position[0]===10) {
    rover.position[0]=0;
  } else if (rover.position[0]===-1) {
    rover.position[0]=9;
  }
  //wrap vertical
  if (rover.position[1]===10) {
    rover.position[1]=0;
  } else if (rover.position[1]===-1) {
    rover.position[1]=9;
  }
}

function turnLeft(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction="W";
      break;
    case 'E':
      rover.direction="N";
      break;
    case 'S':
      rover.direction="E";
      break;
    case 'W':
      rover.direction="S";
      break;
  }
}

function turnRight(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction="E";
      break;
    case 'E':
      rover.direction="S";
      break;
    case 'S':
      rover.direction="W";
      break;
    case 'W':
      rover.direction="N";
      break;
  }
}

function nextPosition(command, rover){
  var nextRover = JSON.parse(JSON.stringify(rover));
  switch (command) {
    case 'f':
      goForward(nextRover);
      break;
    case 'b':
      goBackwards(nextRover);
      break;
    case 'r':
      turnRight(nextRover);
      break;
    case 'l':
      turnLeft(nextRover);
      break;
    default:
    console.log("  Error, command not recognized. Moving on to next command.");
  }
  return nextRover;
}

//Info inicial
console.log("Rover 1 starts in position [" + rover1.position[0] + ", " + rover1.position[1] + "] - " + rover1.direction);
console.log("Rover 2 starts in position [" + rover2.position[0] + ", " + rover2.position[1] + "] - " + rover2.direction);
console.log("Message sent to rovers: " + message);

//Ejecucion de la cadena de messages
var rover1Freeze = 0;
var rover2Freeze = 0;
for(var i=0; i<message.length; i++){
  console.log("Executing command number " + i + " (" +message[i]+") ");

  //Rover 1 moves
  if(rover1Freeze===0){
    var nextRover1 = nextPosition(message[i], rover1);
    console.log("   Rover 1 wants to move to " + nextRover1.position + " - " + nextRover1.direction);
    if (grid[nextRover1.position[0]][nextRover1.position[1]]===1) {
      console.log("   Rover 1 found an obstacle. Last valid position was " + rover1.position);
      rover1Freeze = 1;
    }else if(grid[nextRover1.position[0]][nextRover1.position[1]]==="rover2"){
      console.log("   Rover 1 bumped into Rover 2. End of movements. Last valid position was " + rover1.position);
      break;
    }else{
      grid[rover1.position[0]][rover1.position[1]]="0";
      grid[rover1.position[0]][rover1.position[1]]="rover1";
      rover1 = nextRover1;
      console.log("   Rover 1 moved successfully!");
    }
  }

  //Rover 2 moves
  if(rover2Freeze===0){
    var nextRover2 = nextPosition(message[i], rover2);
    console.log("   Rover 2 wants to move to " + nextRover2.position + " - " + nextRover2.direction);
    if (grid[nextRover2.position[0]][nextRover2.position[1]]===1) {
      console.log("   Rover 2 found an obstacle. Last valid position was " + rover2.position);
      rover2Freeze = 1;
    }else if(grid[nextRover2.position[0]][nextRover2.position[1]]==="rover1"){
      console.log("   Rover 1 bumped into Rover 2. End of movements. Last valid position was " + rover1.position);
      break;
    }else{
      grid[rover2.position[0]][rover2.position[1]]="0";
      grid[rover2.position[0]][rover2.position[1]]="rover2";
      rover2 = nextRover2;
      console.log("   Rover 2 moved successfully!");
    }
  }
  if(rover1Freeze===1 && rover2Freeze===1){
    console.log("Both rovers have encountered obstacles, end of movements");
    break;
  }
}

console.log("Rover 1 final position is " + rover1.position + " - " + rover1.direction);
console.log("Rover 2 final position is " + rover2.position + " - " + rover2.direction);
