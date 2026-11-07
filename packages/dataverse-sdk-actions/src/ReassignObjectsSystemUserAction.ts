import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the ReassignObjectsSystemUser action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ReassignObjectsSystemUserResponse = void;

/**
 * Parameters of the ReassignObjectsSystemUser action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ReassignObjectsSystemUserActionParameters {
  ReassignPrincipal: EntityReference | AnyEntityPayload;
  objectType?: number;
}

/**
 * ReassignObjectsSystemUser action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class ReassignObjectsSystemUserAction implements Executable<ReassignObjectsSystemUserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: ReassignObjectsSystemUserActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.ReassignObjectsSystemUser`;

    const body = requestBody({
      ReassignPrincipal: this.parameters.ReassignPrincipal,
      objectType: this.parameters.objectType,
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

  parseResponse(_response: Response): Promise<ReassignObjectsSystemUserResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
