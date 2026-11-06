import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_RaiseSecondaryChannelEvent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_RaiseSecondaryChannelEventResponse = void;

/**
 * Parameters of the CCaaS_RaiseSecondaryChannelEvent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_RaiseSecondaryChannelEventActionParameters {
  ApiVersion: string;
  SecondaryChannelEventType: string;
  SecondaryChannelSessionId: string;
  SecondaryChannelType: string;
}

/**
 * CCaaS_RaiseSecondaryChannelEvent action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_RaiseSecondaryChannelEventAction implements Executable<CCaaS_RaiseSecondaryChannelEventResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_RaiseSecondaryChannelEventActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RaiseSecondaryChannelEvent`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      SecondaryChannelEventType: this.parameters.SecondaryChannelEventType,
      SecondaryChannelSessionId: this.parameters.SecondaryChannelSessionId,
      SecondaryChannelType: this.parameters.SecondaryChannelType,
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

  parseResponse(_response: Response): Promise<CCaaS_RaiseSecondaryChannelEventResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
