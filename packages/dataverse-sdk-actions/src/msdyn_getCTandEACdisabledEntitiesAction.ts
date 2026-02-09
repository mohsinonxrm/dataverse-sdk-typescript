import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getCTandEACdisabledEntities action
 */
export interface msdyn_getCTandEACdisabledEntitiesResponse {
  msdyn_apiResponse: string;
}

/**
 * msdyn_getCTandEACdisabledEntities action
 *
 * Unbound action
 */
export class msdyn_getCTandEACdisabledEntitiesAction implements Executable<msdyn_getCTandEACdisabledEntitiesResponse> {
  constructor(
    public readonly msdyn_entityName: string,
    public readonly msdyn_entityList: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getCTandEACdisabledEntities`;

    const body: Record<string, unknown> = {
      msdyn_entityName: this.msdyn_entityName,
      msdyn_entityList: this.msdyn_entityList,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_getCTandEACdisabledEntitiesResponse> {
    const data = await response.json();
    return data as msdyn_getCTandEACdisabledEntitiesResponse;
  }
}
