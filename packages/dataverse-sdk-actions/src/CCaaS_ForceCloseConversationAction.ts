import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_ForceCloseConversation action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_ForceCloseConversationResponse = void;

/**
 * Parameters of the CCaaS_ForceCloseConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ForceCloseConversationActionParameters {
  ApiVersion: string;
}

/**
 * CCaaS_ForceCloseConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_ForceCloseConversationAction implements Executable<CCaaS_ForceCloseConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_ForceCloseConversationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ForceCloseConversation`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
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

  parseResponse(_response: Response): Promise<CCaaS_ForceCloseConversationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
