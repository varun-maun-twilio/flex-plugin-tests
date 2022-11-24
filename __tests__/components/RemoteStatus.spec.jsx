import React from 'react';
import { create, act } from 'react-test-renderer';
import { Text } from '@twilio-paste/core/text';
import RemoteStatus from '../../src/components/RemoteStatus/RemoteStatus';
import fetch from 'jest-fetch-mock';



// Global test lifecycle handlers
beforeAll(() => {
    fetch.enableMocks();
  });
  
  beforeEach(() => {
    
    fetch.resetMocks();
    
  })

describe('RemoteStatus', () => {
    

    it('should load and display component with available status', async () => {

        fetch.mockResponse(JSON.stringify({ status: {indicator:'available'}  }))

        
        let renderer;
        await act(async () => {
            renderer = await create(<RemoteStatus />);
        });
        const root = renderer.root;
        const element = root.findByType(Text);
        expect(element.props.children).toEqual('available');



    });

    it('should load and display component with maintainance status', async () => {

        fetch.mockResponse(JSON.stringify({ status: {indicator:'maintainance'}  }))

        
        let renderer;
        await act(async () => {
            renderer = await create(<RemoteStatus />);
        });
        const root = renderer.root;
        const element = root.findByType(Text);
        expect(element.props.children).toEqual('maintainance');



    });

});


