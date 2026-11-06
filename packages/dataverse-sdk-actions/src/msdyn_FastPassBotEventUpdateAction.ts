import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_FastPassBotEventUpdate action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_FastPassBotEventUpdateResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_FastPassBotEventUpdateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
