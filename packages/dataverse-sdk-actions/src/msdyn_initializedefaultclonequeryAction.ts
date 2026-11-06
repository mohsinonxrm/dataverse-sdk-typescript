import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_bookingsetupmetadata, msdyn_configuration } from "./types/index.js";

/**
 * Response from the msdyn_initializedefaultclonequery action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_initializedefaultclonequeryResponse =
  | (msdyn_configuration & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * Parameters of the msdyn_initializedefaultclonequery action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_initializedefaultclonequeryActionParameters {
  WorkType: EntityReference | EntityPayload<msdyn_bookingsetupmetadata>;
  Configuration?: EntityReference | EntityPayload<msdyn_configuration>;
}

/**
 * msdyn_initializedefaultclonequery action
 *
 * Unbound action
 */
export class msdyn_initializedefaultclonequeryAction implements Executable<msdyn_initializedefaultclonequeryResponse> {
  constructor(public readonly parameters: msdyn_initializedefaultclonequeryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_initializedefaultclonequery`;

    const body = requestBody({
      WorkType: this.parameters.WorkType,
      Configuration: this.parameters.Configuration,
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

  async parseResponse(response: Response): Promise<msdyn_initializedefaultclonequeryResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_initializedefaultclonequeryResponse;
  }
}
