import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_cloneentity action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_cloneentityResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the msdyn_cloneentity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_cloneentityActionParameters {
  SourceEntity: EntityReference | AnyEntityPayload;
  QueryReference?: EntityReference | AnyEntityPayload;
  TransformAction?: string;
  TransformParams?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_cloneentity action
 *
 * Unbound action
 */
export class msdyn_cloneentityAction implements Executable<msdyn_cloneentityResponse> {
  constructor(public readonly parameters: msdyn_cloneentityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_cloneentity`;

    const body = requestBody({
      SourceEntity: this.parameters.SourceEntity,
      QueryReference: this.parameters.QueryReference,
      TransformAction: this.parameters.TransformAction,
      TransformParams: this.parameters.TransformParams,
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

  async parseResponse(response: Response): Promise<msdyn_cloneentityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_cloneentityResponse;
    return (await response.json()) as msdyn_cloneentityResponse;
  }
}
