import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_cloneentity action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_cloneentityResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_cloneentityResponse;
  }
}
