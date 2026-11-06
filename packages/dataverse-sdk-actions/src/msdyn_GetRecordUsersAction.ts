import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetRecordUsers action
 */
export interface msdyn_GetRecordUsersResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_GetRecordUsers action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRecordUsersActionParameters {
  RecordType: number;
  RecordId: string;
  RecordTypeName: string;
}

/**
 * msdyn_GetRecordUsers action
 *
 * Unbound action
 */
export class msdyn_GetRecordUsersAction implements Executable<msdyn_GetRecordUsersResponse> {
  constructor(public readonly parameters: msdyn_GetRecordUsersActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRecordUsers`;

    const body = requestBody({
      RecordType: this.parameters.RecordType,
      RecordId: this.parameters.RecordId,
      RecordTypeName: this.parameters.RecordTypeName,
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

  async parseResponse(response: Response): Promise<msdyn_GetRecordUsersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetRecordUsersResponse;
    return (await response.json()) as msdyn_GetRecordUsersResponse;
  }
}
