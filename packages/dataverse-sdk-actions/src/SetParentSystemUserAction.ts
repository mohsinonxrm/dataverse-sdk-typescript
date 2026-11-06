import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Response from the SetParentSystemUser action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type SetParentSystemUserResponse = void;

/**
 * Parameters of the SetParentSystemUser action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetParentSystemUserActionParameters {
  Parent: EntityReference | EntityPayload<systemuser>;
  KeepChildUsers: boolean;
}

/**
 * SetParentSystemUser action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class SetParentSystemUserAction implements Executable<SetParentSystemUserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: SetParentSystemUserActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.SetParentSystemUser`;

    const body = requestBody({
      Parent: this.parameters.Parent,
      KeepChildUsers: this.parameters.KeepChildUsers,
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

  parseResponse(_response: Response): Promise<SetParentSystemUserResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
