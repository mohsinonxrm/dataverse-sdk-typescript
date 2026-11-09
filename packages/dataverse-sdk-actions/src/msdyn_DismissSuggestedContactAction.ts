import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DismissSuggestedContact action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_DismissSuggestedContactResponse = void;

/**
 * Parameters of the msdyn_DismissSuggestedContact action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DismissSuggestedContactActionParameters {
  SuggestedContactId: string;
  DismissContact: boolean;
}

/**
 * msdyn_DismissSuggestedContact action
 *
 * Unbound action
 */
export class msdyn_DismissSuggestedContactAction implements Executable<msdyn_DismissSuggestedContactResponse> {
  constructor(public readonly parameters: msdyn_DismissSuggestedContactActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissSuggestedContact`;

    const body = requestBody({
      SuggestedContactId: this.parameters.SuggestedContactId,
      DismissContact: this.parameters.DismissContact,
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

  parseResponse(_response: Response): Promise<msdyn_DismissSuggestedContactResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
