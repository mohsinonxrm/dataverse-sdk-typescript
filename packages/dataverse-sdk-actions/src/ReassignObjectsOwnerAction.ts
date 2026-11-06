import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from ReassignObjectsOwner action
 */
export interface ReassignObjectsOwnerResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<ReassignObjectsOwnerResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ReassignObjectsOwnerResponse;
    return (await response.json()) as ReassignObjectsOwnerResponse;
  }
}
