import { EventEmitter } from 'events';

export default class Reservation extends EventEmitter {
  sid;
  task;
  
  constructor(sid, task) {
    super();
    this.sid = sid;
    this.task = task;
  }
}