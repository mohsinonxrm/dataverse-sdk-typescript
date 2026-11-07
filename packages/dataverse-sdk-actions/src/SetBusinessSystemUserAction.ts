import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { businessunit } from "./types/index.js";

/**
 * Response from the SetBusinessSystemUser action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type SetBusinessSystemUserResponse = void;

/**
 * Parameters of the SetBusinessSystemUser action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetBusinessSystemUserActionParameters {
  BusinessUnit: EntityReference | EntityPayload<businessunit>;
  ReassignPrincipal: EntityReference | AnyEntityPayload;
  DoNotMoveAllRecords?: boolean;
}

/**
 * SetBusinessSystemUser action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class SetBusinessSystemUserAction implements Executable<SetBusinessSystemUserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: SetBusinessSystemUserActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.SetBusinessSystemUser`;

    const body = requestBody({
      BusinessUnit: this.parameters.BusinessUnit,
      ReassignPrincipal: this.parameters.ReassignPrincipal,
      DoNotMoveAllRecords: this.parameters.DoNotMoveAllRecords,
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

  parseResponse(_response: Response): Promise<SetBusinessSystemUserResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
