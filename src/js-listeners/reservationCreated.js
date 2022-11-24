import * as Flex from '@twilio/flex-ui';
import { TaskHelper } from "@twilio/flex-ui";



export default (flex, manager) => {
  (manager.workerClient).on('reservationCreated', (reservation) => {
    autoAcceptVoiceTask(flex, manager, reservation);
  });
}


async function autoAcceptVoiceTask(flex, manager, reservation) {
  const { sid, task } = reservation;

  const { taskChannelUniqueName, transfers, attributes } = task;

  if (taskChannelUniqueName === 'voice') {

    
    // Auto select the voice task
    flex.Actions.invokeAction('SelectTask', { sid });

   
    if (((transfers.incoming !== undefined && transfers.incoming !== null) || attributes.direction !== 'outbound')) {



      let autoAcceptInterval = 6;

      var autoAcceptTimer = setInterval(async function () {
        if (Flex.TaskHelper.isTaskAccepted(task)) {
          clearInterval(autoAcceptTimer);
          Flex.Actions.invokeAction('SelectTask', { sid })
        }
        if(autoAcceptInterval <= 0){
          clearInterval(autoAcceptTimer);
          if (!Flex.TaskHelper.isTaskAccepted(task)){
            flex.Actions.invokeAction('AcceptTask', { sid });
          }
        }
        autoAcceptInterval = autoAcceptInterval - 1;
        
      }, 1000);







    }
  }
}