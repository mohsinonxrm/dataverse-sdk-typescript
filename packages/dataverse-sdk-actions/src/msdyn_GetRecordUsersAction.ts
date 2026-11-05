import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetRecordUsers action
 */
export interface msdyn_GetRecordUsersResponse {
  value: EntityReference[];
}

/**
 * msdyn_GetRecordUsers action
 *
 * Unbound action
 */
export class msdyn_GetRecordUsersAction implements Executable<msdyn_GetRecordUsersResponse> {
  constructor(
    public readonly recordType: number,
    public readonly recordId: string,
    public readonly recordTypeName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRecordUsers`;

    const body: Record<string, unknown> = {
      RecordType: this.recordType,
      RecordId: this.recordId,
      RecordTypeName: this.recordTypeName,
    };

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
    const data = await response.json();
    return data as msdyn_GetRecordUsersResponse;
  }
}
