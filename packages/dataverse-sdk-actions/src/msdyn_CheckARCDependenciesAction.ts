import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { queueitem } from "./types/index.js";

/**
 * Response from msdyn_CheckARCDependencies action
 */
export interface msdyn_CheckARCDependenciesResponse {
  msdyn_AreDependenciesMet: boolean;
}

/**
 * Parameters of the msdyn_CheckARCDependencies action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckARCDependenciesActionParameters {
  msdyn_Activity: EntityReference | AnyEntityPayload;
  msdyn_QueueItem: EntityReference | EntityPayload<queueitem>;
}

/**
 * msdyn_CheckARCDependencies action
 *
 * Unbound action
 */
export class msdyn_CheckARCDependenciesAction implements Executable<msdyn_CheckARCDependenciesResponse> {
  constructor(public readonly parameters: msdyn_CheckARCDependenciesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckARCDependencies`;

    const body = requestBody({
      msdyn_Activity: this.parameters.msdyn_Activity,
      msdyn_QueueItem: this.parameters.msdyn_QueueItem,
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

  async parseResponse(response: Response): Promise<msdyn_CheckARCDependenciesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckARCDependenciesResponse;
    return (await response.json()) as msdyn_CheckARCDependenciesResponse;
  }
}
