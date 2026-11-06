import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_KnowledgeHarvestFetchData action
 */
export interface msdyn_KnowledgeHarvestFetchDataResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_KnowledgeHarvestFetchData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_KnowledgeHarvestFetchDataActionParameters {
  msdyn_entityId: string;
  msdyn_entityName: string;
}

/**
 * msdyn_KnowledgeHarvestFetchData action
 *
 * Unbound action
 */
export class msdyn_KnowledgeHarvestFetchDataAction implements Executable<msdyn_KnowledgeHarvestFetchDataResponse> {
  constructor(public readonly parameters: msdyn_KnowledgeHarvestFetchDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_KnowledgeHarvestFetchData`;

    const body = requestBody({
      msdyn_entityId: this.parameters.msdyn_entityId,
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

  async parseResponse(response: Response): Promise<msdyn_KnowledgeHarvestFetchDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_KnowledgeHarvestFetchDataResponse;
  }
}
