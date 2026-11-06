import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CreateInstance action
 */
export interface CreateInstanceResponse {
  SeriesCanBeExpanded: boolean;
}

/**
 * Parameters of the CreateInstance action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateInstanceActionParameters {
  Target: EntityReference | AnyEntityPayload;
  Count: number;
}

/**
 * CreateInstance action
 *
 * Unbound action
 */
export class CreateInstanceAction implements Executable<CreateInstanceResponse> {
  constructor(public readonly parameters: CreateInstanceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateInstance`;

    const body = requestBody({
      Target: this.parameters.Target,
      Count: this.parameters.Count,
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

  async parseResponse(response: Response): Promise<CreateInstanceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CreateInstanceResponse;
    return (await response.json()) as CreateInstanceResponse;
  }
}
