import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_EndSecondaryChannel action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_EndSecondaryChannelResponse = void;

/**
 * Parameters of the CCaaS_EndSecondaryChannel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_EndSecondaryChannelActionParameters {
  ApiVersion: string;
  SecondaryChannelType: string;
  SecondaryChannelSessionId: string;
}

/**
 * CCaaS_EndSecondaryChannel action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_EndSecondaryChannelAction implements Executable<CCaaS_EndSecondaryChannelResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_EndSecondaryChannelActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_EndSecondaryChannel`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      SecondaryChannelType: this.parameters.SecondaryChannelType,
      SecondaryChannelSessionId: this.parameters.SecondaryChannelSessionId,
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

  parseResponse(_response: Response): Promise<CCaaS_EndSecondaryChannelResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
