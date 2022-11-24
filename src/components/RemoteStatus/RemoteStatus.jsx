import React, { useEffect, useState } from 'react';

import { Alert } from '@twilio-paste/core/alert';
import { Theme } from '@twilio-paste/core/theme';
import { Text } from '@twilio-paste/core/text';

import {Manager} from "@twilio/flex-ui"

const RemoteStatus = () => {
  
    const [status,setStatus] = useState("Unknown")


    async function fetchTwilioStatus() {
       const resp = await  fetch("https://status.twilio.com/api/v2/status.json").then(d=>d.json()).catch(e=>{console.error(e)});
       const statusText = resp?.status?.indicator || "Unknown"
       setStatus(statusText);
       
       
      }

    useEffect(()=>{

        fetchTwilioStatus();


    },[])
  return (
    <Theme.Provider theme="default">
     
        <Text>{ status }</Text>
     
    </Theme.Provider>
  );
};

export default RemoteStatus;
