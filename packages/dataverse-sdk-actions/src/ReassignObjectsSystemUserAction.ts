import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from ReassignObjectsSystemUser action
 */
export interface ReassignObjectsSystemUserResponse {
  // No content returned
}

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
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.ReassignObjectsSystemUser`;

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

  async parseResponse(response: Response): Promise<ReassignObjectsSystemUserResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ReassignObjectsSystemUserResponse;
    return (await response.json()) as ReassignObjectsSystemUserResponse;
  }
}
