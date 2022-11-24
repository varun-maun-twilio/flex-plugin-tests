import React from 'react';
import { create, act } from 'react-test-renderer';

import FlexTestsPlugin from '../src/FlexTestsPlugin';
import CustomTaskList from "../src/components/CustomTaskList/CustomTaskList";
import FlexWorkerName from '../src/components/FlexWorkerName/FlexWorkerName'
const renderAllFragments = (fragments) => (<>{fragments.map(x => (x))}</>)

beforeEach(() => {
    jest.resetModules()
});

describe('Flex UI', () => {
    it('plugin initialized tests', async () => {
        const flex = require("@twilio/flex-ui");
        const plugin = new FlexTestsPlugin();
        await plugin.init(flex, flex.Manager);

        const renderer = create(renderAllFragments(flex.AgentDesktopView.Panel1.Content.fragments));
        const root = renderer.root;

        expect(root.findAllByType(CustomTaskList).length).toEqual(1);
    });

    it('Enabling agentNameWithinHeader', async () => {
        const flex = require("@twilio/flex-ui");
        flex.Manager.serviceConfiguration.ui_attributes.custom_config.agentNameWithinHeader.enabled = 'Y'

        const plugin = new FlexTestsPlugin();
        await plugin.init(flex, flex.Manager);

        const renderer = create(renderAllFragments(flex.AgentDesktopView.Panel1.Content.fragments));
        const root = renderer.root;

        expect(root.findAllByType(FlexWorkerName).length).toEqual(1);

    });

});
