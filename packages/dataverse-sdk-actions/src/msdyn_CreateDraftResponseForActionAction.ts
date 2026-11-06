import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateDraftResponseForAction action
 */
export interface msdyn_CreateDraftResponseForActionResponse {
  msdyn_actionType: number;
  msdyn_to: string[];
  msdyn_messageId: string;
  msdyn_scheduledEnd: string;
  msdyn_internetMessageId: string;
  msdyn_subject: string;
  msdyn_cc: string[];
  msdyn_description: string;
  msdyn_scheduledStart: string;
}

/**
 * Parameters of the msdyn_CreateDraftResponseForAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateDraftResponseForActionActionParameters {
  msdyn_input: string;
}

/**
 * msdyn_CreateDraftResponseForAction action
 *
 * Unbound action
 */
export class msdyn_CreateDraftResponseForActionAction implements Executable<msdyn_CreateDraftResponseForActionResponse> {
  constructor(public readonly parameters: msdyn_CreateDraftResponseForActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateDraftResponseForAction`;

    const body = requestBody({
      msdyn_input: this.parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateDraftResponseForActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateDraftResponseForActionResponse;
  }
}
