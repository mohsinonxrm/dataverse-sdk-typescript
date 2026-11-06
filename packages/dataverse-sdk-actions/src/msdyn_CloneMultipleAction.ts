import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_configuration } from "./types/index.js";

/**
 * Response from msdyn_CloneMultiple action
 */
export interface msdyn_CloneMultipleResponse {
  CopiedEntities: string;
}

/**
 * Parameters of the msdyn_CloneMultiple action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CloneMultipleActionParameters {
  EntityIds: string;
  QueryReference?: EntityReference | EntityPayload<msdyn_configuration>;
  UfxQuery?: string;
  TransformAction?: string;
  TransformParams?: string;
}

/**
 * msdyn_CloneMultiple action
 *
 * Unbound action
 */
export class msdyn_CloneMultipleAction implements Executable<msdyn_CloneMultipleResponse> {
  constructor(public readonly parameters: msdyn_CloneMultipleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CloneMultiple`;

    const body = requestBody({
      EntityIds: this.parameters.EntityIds,
      QueryReference: this.parameters.QueryReference,
      UfxQuery: this.parameters.UfxQuery,
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

  async parseResponse(response: Response): Promise<msdyn_CloneMultipleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CloneMultipleResponse;
  }
}
