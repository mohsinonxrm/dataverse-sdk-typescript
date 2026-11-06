import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_transformentity action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_transformentityResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the msdyn_transformentity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_transformentityActionParameters {
  Entity: EntityReference | AnyEntityPayload;
  Params: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_transformentity action
 *
 * Unbound action
 */
export class msdyn_transformentityAction implements Executable<msdyn_transformentityResponse> {
  constructor(public readonly parameters: msdyn_transformentityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_transformentity`;

    const body = requestBody({
      Entity: this.parameters.Entity,
      Params: this.parameters.Params,
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

  async parseResponse(response: Response): Promise<msdyn_transformentityResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_transformentityResponse;
  }
}
