import React from 'react';
import { create, act} from 'react-test-renderer'; 

import FlexTestsPlugin  from '../../../src/FlexTestsPlugin';


beforeEach(() => {
    jest.resetModules()
});

describe('Custom Caller Id', () => {
    it('replace caller id from flex config', async () => {

       

        const flex = require("@twilio/flex-ui");
        flex.Manager.serviceConfiguration.ui_attributes.callerId = 'mockCallerId'
        

        const plugin = new FlexTestsPlugin();
        await plugin.init(flex,flex.Manager);
        

        const testBeforeStartOutboundCall = jest.fn();

        flex.Actions.addListener(
            "beforeStartOutboundCall",
            testBeforeStartOutboundCall
          );
       flex.Actions.invokeAction("StartOutboundCall", {
        destination: "+1234567",
        queueSid: "WQXXXXXXXXXXXXXXXXX"
        });

        expect(testBeforeStartOutboundCall).toBeCalledWith(
            expect.objectContaining({
                callerId : 'mockCallerId'
            }),
          );

       
    });

    
    
});
