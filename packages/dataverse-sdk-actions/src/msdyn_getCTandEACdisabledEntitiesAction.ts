import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_getCTandEACdisabledEntities action
 */
export interface msdyn_getCTandEACdisabledEntitiesResponse {
  msdyn_apiResponse: string;
}

/**
 * Parameters of the msdyn_getCTandEACdisabledEntities action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getCTandEACdisabledEntitiesActionParameters {
  msdyn_entityList: string;
  msdyn_entityName: string;
}

/**
 * msdyn_getCTandEACdisabledEntities action
 *
 * Unbound action
 */
export class msdyn_getCTandEACdisabledEntitiesAction implements Executable<msdyn_getCTandEACdisabledEntitiesResponse> {
  constructor(public readonly parameters: msdyn_getCTandEACdisabledEntitiesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getCTandEACdisabledEntities`;

    const body = requestBody({
      msdyn_entityList: this.parameters.msdyn_entityList,
      msdyn_entityName: this.parameters.msdyn_entityName,
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

  async parseResponse(response: Response): Promise<msdyn_getCTandEACdisabledEntitiesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_getCTandEACdisabledEntitiesResponse;
    return (await response.json()) as msdyn_getCTandEACdisabledEntitiesResponse;
  }
}
