import React from 'react';
import { create, act} from 'react-test-renderer'; 
import { Text } from '@twilio-paste/core/text';
import { Alert } from '@twilio-paste/core/alert';

import FlexWorkerName from '../../src/components/FlexWorkerName/FlexWorkerName';

describe('FlexWorkerName', () => {
    it('component should load data from flex redux store', () => {
        const renderer = create(<FlexWorkerName />);
        const root = renderer.root;

        const element = root.findByType(Text);
        expect(element.props.children).toEqual('Flex Agent');
    });
    
});
