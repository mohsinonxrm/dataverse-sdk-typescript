import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GDPROptoutContact action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_GDPROptoutContactResponse = void;

/**
 * Parameters of the msdyn_GDPROptoutContact action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GDPROptoutContactActionParameters {
  optout: boolean;
}

/**
 * msdyn_GDPROptoutContact action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contact)
 *
 * The first argument is the id of the contact record to call it on.
 */
export class msdyn_GDPROptoutContactAction implements Executable<msdyn_GDPROptoutContactResponse> {
  constructor(
    public readonly contactId: string,
    public readonly parameters: msdyn_GDPROptoutContactActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutContact`;

    const body = requestBody({
      optout: this.parameters.optout,
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

  parseResponse(_response: Response): Promise<msdyn_GDPROptoutContactResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
