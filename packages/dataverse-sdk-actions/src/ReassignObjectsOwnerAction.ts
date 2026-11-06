import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the ReassignObjectsOwner action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ReassignObjectsOwnerResponse = void;

/**
 * Parameters of the ReassignObjectsOwner action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ReassignObjectsOwnerActionParameters {
  FromPrincipal: EntityReference | AnyEntityPayload;
  ToPrincipal: EntityReference | AnyEntityPayload;
  objectType?: number;
}

/**
 * ReassignObjectsOwner action
 *
 * Unbound action
 */
export class ReassignObjectsOwnerAction implements Executable<ReassignObjectsOwnerResponse> {
  constructor(public readonly parameters: ReassignObjectsOwnerActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReassignObjectsOwner`;

    const body = requestBody({
      FromPrincipal: this.parameters.FromPrincipal,
      ToPrincipal: this.parameters.ToPrincipal,
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

  parseResponse(_response: Response): Promise<ReassignObjectsOwnerResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
