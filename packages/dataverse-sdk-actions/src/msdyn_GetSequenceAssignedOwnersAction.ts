import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSequenceAssignedOwners action
 */
export interface msdyn_GetSequenceAssignedOwnersResponse {
  SequenceAssignedOwners: string;
}

/**
 * Parameters of the msdyn_GetSequenceAssignedOwners action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSequenceAssignedOwnersActionParameters {
  RegardingEntityId: string;
  RegardingEntityName: string;
  SequenceIds: string;
}

/**
 * msdyn_GetSequenceAssignedOwners action
 *
 * Unbound action
 */
export class msdyn_GetSequenceAssignedOwnersAction implements Executable<msdyn_GetSequenceAssignedOwnersResponse> {
  constructor(public readonly parameters: msdyn_GetSequenceAssignedOwnersActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSequenceAssignedOwners`;

    const body = requestBody({
      RegardingEntityId: this.parameters.RegardingEntityId,
      RegardingEntityName: this.parameters.RegardingEntityName,
      SequenceIds: this.parameters.SequenceIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetSequenceAssignedOwnersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetSequenceAssignedOwnersResponse;
  }
}
