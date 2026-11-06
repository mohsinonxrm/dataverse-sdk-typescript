import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SetAutoNumberSeed action
 */
export interface SetAutoNumberSeedResponse {
  // No content returned
}

/**
 * Parameters of the SetAutoNumberSeed action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetAutoNumberSeedActionParameters {
  EntityName: string;
  AttributeName: string;
  Value: number;
}

/**
 * SetAutoNumberSeed action
 *
 * Unbound action
 */
export class SetAutoNumberSeedAction implements Executable<SetAutoNumberSeedResponse> {
  constructor(public readonly parameters: SetAutoNumberSeedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetAutoNumberSeed`;

    const body = requestBody({
      EntityName: this.parameters.EntityName,
      AttributeName: this.parameters.AttributeName,
      Value: this.parameters.Value,
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

  async parseResponse(response: Response): Promise<SetAutoNumberSeedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SetAutoNumberSeedResponse;
    return (await response.json()) as SetAutoNumberSeedResponse;
  }
}
