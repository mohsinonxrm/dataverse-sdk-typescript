import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { LocalizedLabel } from "./types/index.js";

/**
 * Response from SetLocLabels action
 */
export interface SetLocLabelsResponse {
  // No content returned
}

/**
 * Parameters of the SetLocLabels action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetLocLabelsActionParameters {
  EntityMoniker: EntityReference | AnyEntityPayload;
  AttributeName: string;
  Labels?: LocalizedLabel[];
}

/**
 * SetLocLabels action
 *
 * Unbound action
 */
export class SetLocLabelsAction implements Executable<SetLocLabelsResponse> {
  constructor(public readonly parameters: SetLocLabelsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetLocLabels`;

    const body = requestBody({
      EntityMoniker: this.parameters.EntityMoniker,
      AttributeName: this.parameters.AttributeName,
      Labels: this.parameters.Labels,
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

  async parseResponse(response: Response): Promise<SetLocLabelsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SetLocLabelsResponse;
    return (await response.json()) as SetLocLabelsResponse;
  }
}
