import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ocoutboundconfiguration } from "./types/index.js";

/**
 * Response from the msdyn_InvokeOutboundAPI action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_InvokeOutboundAPIResponse = void;

/**
 * Parameters of the msdyn_InvokeOutboundAPI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeOutboundAPIActionParameters {
  OutboundSettingsRecord?: EntityReference | EntityPayload<msdyn_ocoutboundconfiguration>;
  ContactList?: string;
}

/**
 * msdyn_InvokeOutboundAPI action
 *
 * Unbound action
 */
export class msdyn_InvokeOutboundAPIAction implements Executable<msdyn_InvokeOutboundAPIResponse> {
  constructor(public readonly parameters: msdyn_InvokeOutboundAPIActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeOutboundAPI`;

    const body = requestBody({
      OutboundSettingsRecord: this.parameters.OutboundSettingsRecord,
      ContactList: this.parameters.ContactList,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<msdyn_InvokeOutboundAPIResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
