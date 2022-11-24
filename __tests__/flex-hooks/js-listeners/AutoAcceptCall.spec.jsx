import React from 'react';
import { create, act} from 'react-test-renderer'; 

import FlexTestsPlugin  from '../../../src/FlexTestsPlugin';
import Reservation from "../../../test-utils/task-router/Reservation"

beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
});

describe('Auto Accept call', () => {
    it('auto accept call in 6 seconds', async () => {

       

        const flex = require("@twilio/flex-ui");


        const plugin = new FlexTestsPlugin();
        await plugin.init(flex,flex.Manager);
       
        const inboundVoiceTask = { taskChannelUniqueName: 'voice', transfers: {}, attributes: { direction: 'inbound' } };
        
        flex.Manager.workerClient.emit('reservationCreated', new Reservation('testSid', inboundVoiceTask));
       

        
        jest.spyOn(flex.TaskHelper, 'isTaskAccepted')
        .mockImplementation((task) => {
         
            return false;
         
        });

        jest.advanceTimersByTime(1000);

        expect(flex.Actions.invokeAction).toBeCalledWith(
            'SelectTask',
            expect.objectContaining({
                sid : 'testSid'
            }),
          );

          jest.advanceTimersByTime(5000);
          expect(flex.Actions.invokeAction).not.toBeCalledWith(
            'AcceptTask',
            expect.objectContaining({
                sid : 'testSid'
            }),
          );
       

          jest.advanceTimersByTime(2000);
          expect(flex.Actions.invokeAction).toBeCalledWith(
            'AcceptTask',
            expect.objectContaining({
                sid : 'testSid'
            }),
          );
          

       
       
    });

    
    
});
