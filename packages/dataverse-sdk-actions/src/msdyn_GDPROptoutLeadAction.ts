import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GDPROptoutLead action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_GDPROptoutLeadResponse = void;

/**
 * Parameters of the msdyn_GDPROptoutLead action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GDPROptoutLeadActionParameters {
  optout: boolean;
}

/**
 * msdyn_GDPROptoutLead action
 *
 * Bound action
 * Binding parameter: entity (mscrm.lead)
 *
 * The first argument is the id of the lead record to call it on.
 */
export class msdyn_GDPROptoutLeadAction implements Executable<msdyn_GDPROptoutLeadResponse> {
  constructor(
    public readonly leadId: string,
    public readonly parameters: msdyn_GDPROptoutLeadActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/leads(${odataLiteral.guid(this.leadId)})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutLead`;

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

  parseResponse(_response: Response): Promise<msdyn_GDPROptoutLeadResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
