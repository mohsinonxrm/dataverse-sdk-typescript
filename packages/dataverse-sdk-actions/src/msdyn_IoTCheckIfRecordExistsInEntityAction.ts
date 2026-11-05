import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTCheckIfRecordExistsInEntity action
 */
export interface msdyn_IoTCheckIfRecordExistsInEntityResponse {
  IsRecordExists: boolean;
}

/**
 * msdyn_IoTCheckIfRecordExistsInEntity action
 *
 * Unbound action
 */
export class msdyn_IoTCheckIfRecordExistsInEntityAction implements Executable<msdyn_IoTCheckIfRecordExistsInEntityResponse> {
  constructor(public readonly entitiesLogicalNames: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTCheckIfRecordExistsInEntity`;

    const body: Record<string, unknown> = {
      EntitiesLogicalNames: this.entitiesLogicalNames,
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

  async parseResponse(response: Response): Promise<msdyn_IoTCheckIfRecordExistsInEntityResponse> {
    const data = await response.json();
    return data as msdyn_IoTCheckIfRecordExistsInEntityResponse;
  }
}
