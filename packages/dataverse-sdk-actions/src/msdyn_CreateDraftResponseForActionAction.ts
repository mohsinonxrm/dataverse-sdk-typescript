import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CreateDraftResponseForAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateDraftResponseForActionResponse {
  "@odata.context"?: string;
  msdyn_actionType: number;
  msdyn_cc: string[];
  msdyn_description: string;
  msdyn_internetMessageId: string;
  msdyn_messageId: string;
  msdyn_scheduledEnd: string;
  msdyn_scheduledStart: string;
  msdyn_subject: string;
  msdyn_to: string[];
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreateDraftResponseForActionResponse;
  }
}
