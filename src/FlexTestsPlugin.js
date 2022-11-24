import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskList from './components/CustomTaskList/CustomTaskList';
import FlexWorkerName from './components/FlexWorkerName/FlexWorkerName';
import RemoteStatus from './components/RemoteStatus/RemoteStatus';
import ReservationCreatedListeners from './js-listeners/reservationCreated'

const PLUGIN_NAME = 'FlexTestsPlugin';

export default class FlexTestsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
   
    //Add dumb component
    flex.AgentDesktopView.Panel1.Content.add(<CustomTaskList key="FlexTestsPlugin-component1" />, { sortOrder: -1 });

    //Conditionally Adding component which invokes an API
    const isTwilioStatusDisplayEnabled = flex.Manager.getInstance().serviceConfiguration.ui_attributes?.custom_config?.twilioStatusDisplay?.enabled;
    flex.AgentDesktopView.Panel1.Content.add(<RemoteStatus key="FlexTestsPlugin-component2" />, {
      sortOrder:-1,
      if:()=>isTwilioStatusDisplayEnabled!='N'
    });

    //Conditionally Adding component which uses redux store
    const isAgentNameWithinHeaderEnabled = flex.Manager.getInstance().serviceConfiguration.ui_attributes?.custom_config?.agentNameWithinHeader?.enabled;
    flex.AgentDesktopView.Panel1.Content.add(<FlexWorkerName key="FlexTestsPlugin-component3" />, {
      sortOrder:-1,
      if:()=>isAgentNameWithinHeaderEnabled!='N'
    });


    //Caller Id
    const defaultCallerId = flex.Manager.getInstance().serviceConfiguration.ui_attributes?.callerId ;
    flex.Actions.addListener(
      "beforeStartOutboundCall",
      async (payload, abortFunction) => {
       if (!payload.callerId && defaultCallerId)
          payload.callerId = defaultCallerId;
      }
    );

    //AutoAccept Voice Calls
    ReservationCreatedListeners(flex,manager);

  
  }
}
