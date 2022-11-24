import React, { useState } from 'react';

import { Alert } from '@twilio-paste/core/alert';
import { Theme } from '@twilio-paste/core/theme';
import { Text } from '@twilio-paste/core/text';

import {Manager} from "@twilio/flex-ui"

const FlexWorkerName = () => {
  

  return (
    <Theme.Provider theme="default">
     
        <Text>{ Manager.getInstance().store.getState().flex.worker.attributes.full_name }</Text>
     
    </Theme.Provider>
  );
};

export default FlexWorkerName;
