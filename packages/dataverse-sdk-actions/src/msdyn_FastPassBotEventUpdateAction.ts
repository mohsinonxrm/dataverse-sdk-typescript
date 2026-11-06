import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_FastPassBotEventUpdate action
 */
export interface msdyn_FastPassBotEventUpdateResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_FastPassBotEventUpdate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FastPassBotEventUpdateActionParameters {
  msdyn_PreImageRecord: EntityReference | AnyEntityPayload;
  msdyn_PostImageRecord: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_FastPassBotEventUpdate action
 *
 * Unbound action
 */
export class msdyn_FastPassBotEventUpdateAction implements Executable<msdyn_FastPassBotEventUpdateResponse> {
  constructor(public readonly parameters: msdyn_FastPassBotEventUpdateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FastPassBotEventUpdate`;

    const body = requestBody({
      msdyn_PreImageRecord: this.parameters.msdyn_PreImageRecord,
      msdyn_PostImageRecord: this.parameters.msdyn_PostImageRecord,
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

  async parseResponse(response: Response): Promise<msdyn_FastPassBotEventUpdateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_FastPassBotEventUpdateResponse;
    return (await response.json()) as msdyn_FastPassBotEventUpdateResponse;
  }
}
