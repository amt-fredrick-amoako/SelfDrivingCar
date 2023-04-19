import { getObstacleEvents } from './computer-vision';

interface AutonomousCar{
  isRunning?: boolean;
  respond: (events:Events) => void;
}

interface AutonomousCarProps{
  isRunning?: boolean;
  steeringControl: Steering;
}

interface Events{
  [obstacle: string]: boolean;
}

interface Control{
  execute: (command:string) => void;
}

interface Steering extends Control{
  turn: (direction:string) => void;
}

class SteeringControl implements Steering{
    execute(command:string){
      console.log(`Executing: ${command}`);
    }

    turn(direction:string){
      this.execute(direction);
    }
}

class Car implements AutonomousCar{
  isRunning?;
  steeringControl;
  constructor(props: AutonomousCarProps){
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
  }

  respond(events:Events){
    Object.keys(events).forEach(eventKey => {
      if(!events[eventKey]){
        return;
      }
      if(eventKey === "ObstacleLeft"){
        this.steeringControl.turn("right");
      }
      if(eventKey === "ObstacleRight"){
        this.steeringControl.turn("left");
      }
    });
    if(!this.isRunning){
      console.log("car is off");
      return;
    }
  }
}

const steering = new SteeringControl();
steering.turn("right");
const autonomousCar = new Car({isRunning:false, steeringControl:steering});
autonomousCar.respond(getObstacleEvents());