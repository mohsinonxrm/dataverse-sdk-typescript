import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the TriggerServiceEndpointCheck action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type TriggerServiceEndpointCheckResponse = void;

/**
 * TriggerServiceEndpointCheck action
 *
 * Bound action
 * Binding parameter: entity (mscrm.serviceendpoint)
 *
 * The first argument is the id of the serviceendpoint record to call it on.
 */
export class TriggerServiceEndpointCheckAction implements Executable<TriggerServiceEndpointCheckResponse> {
  constructor(public readonly serviceendpointId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/serviceendpoints(${odataLiteral.guid(this.serviceendpointId)})/Microsoft.Dynamics.CRM.TriggerServiceEndpointCheck`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<TriggerServiceEndpointCheckResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
