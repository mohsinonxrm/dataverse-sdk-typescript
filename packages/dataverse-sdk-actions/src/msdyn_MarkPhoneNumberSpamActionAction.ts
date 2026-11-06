import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_MarkPhoneNumberSpamAction action
 */
export interface msdyn_MarkPhoneNumberSpamActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_MarkPhoneNumberSpamAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MarkPhoneNumberSpamActionActionParameters {
  PhoneNumber: string;
  Action: number;
  FlaggedStatus?: number;
  Annotation?: string;
  CurrentActiveConversationId: string;
}

/**
 * msdyn_MarkPhoneNumberSpamAction action
 *
 * Unbound action
 */
export class msdyn_MarkPhoneNumberSpamActionAction implements Executable<msdyn_MarkPhoneNumberSpamActionResponse> {
  constructor(public readonly parameters: msdyn_MarkPhoneNumberSpamActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarkPhoneNumberSpamAction`;

    const body = requestBody({
      PhoneNumber: this.parameters.PhoneNumber,
      Action: this.parameters.Action,
      FlaggedStatus: this.parameters.FlaggedStatus,
      Annotation: this.parameters.Annotation,
      CurrentActiveConversationId: this.parameters.CurrentActiveConversationId,
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

  async parseResponse(response: Response): Promise<msdyn_MarkPhoneNumberSpamActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_MarkPhoneNumberSpamActionResponse;
    return (await response.json()) as msdyn_MarkPhoneNumberSpamActionResponse;
  }
}
