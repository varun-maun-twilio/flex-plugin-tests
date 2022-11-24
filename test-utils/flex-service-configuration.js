import { mergeWith, unset } from 'lodash';


const defaultServiceConfiguration = {
  account_sid: 'mockAccountSid',
  attributes: {},
  call_recording_enabled: false,
  chat_service_instance_sid: 'mockChatServiceInstanceSid',
  crm_attributes: null,
  crm_callback_url: 'mockCrmCallbackUrl',
  crm_enabled: false,
  crm_fallback_url: 'mockCrmFallbackUrl',
  crm_type: 'mockCrmType',
  date_created: new Date().toISOString(),
  date_updated: new Date().toISOString(),
  messaging_service_instance_sid: 'mockMessagingServiceInstanceSid',
  outbound_call_flows: {},
  plugin_service_attributes: {},
  queue_stats_configuration: null,
  runtime_domain: 'mockRuntimeDomain',
  service_version: 'mockServiceVersion',
  status: 'mockStatus',
  taskrouter_offline_activity_sid: 'mockTaskrouterOfflineActivitySid',
  taskrouter_skills: [],
  taskrouter_target_taskqueue_sid: 'mockTaskrouterTargetTaskqueueSid',
  taskrouter_target_workflow_sid: 'mockTaskrouterTargetWorkflowSid',
  taskrouter_taskqueues: null,
  taskrouter_worker_attributes: null,
  taskrouter_worker_channels: null,
  taskrouter_workspace_sid: 'mockTaskrouterWorkspaceSid',
  ui_attributes: {
    serverless_functions_domain: 'mockServerlessFunctionsDomain',
    callerId:'mockCallerId',
    custom_config: {
      agentNameWithinHeader:{
        enabled:'N'
      },
      twilioStatusDisplay:{
        enabled:'N'
      }
    }
  },
  ui_language: 'mockUiLanguage',
  ui_version: 'mockUiVersion',
  url: 'mockUrl',
  markdown: {
    enabled: false,
    mode: 'readOnly'
  },
  notifications: {
    enabled: false,
    mode: 'whenNotInFocus'
  },
  call_recording_webhook_url: '',
  flex_service_instance_sid: '',
  plugin_service_enabled: false,
  public_attributes: undefined,
  serverless_service_sids: [],
  ui_dependencies: {}
}

let mockedServiceConfiguration = {
  ...defaultServiceConfiguration
};

export const getMockedServiceConfiguration = () => mockedServiceConfiguration;
export const resetServiceConfiguration = () => {
  mockedServiceConfiguration = {
   ...defaultServiceConfiguration
  };
}
export const setServiceConfiguration = (serviceConfiguration) => {
  mergeWith(mockedServiceConfiguration, serviceConfiguration, (objValue, srcValue, key, obj) => {
    if (srcValue === undefined) {
      unset(obj, key);
    }
  });
}