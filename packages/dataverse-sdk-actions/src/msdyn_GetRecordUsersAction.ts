import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetRecordUsers action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetRecordUsersResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: msdyn_GetRecordUsersResponse }).value;
  }
}
