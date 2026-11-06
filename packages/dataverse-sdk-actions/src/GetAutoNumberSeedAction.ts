import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GetAutoNumberSeed action
 */
export interface GetAutoNumberSeedResponse {
  AutoNumberSeedValue: number;
}

/**
 * Parameters of the GetAutoNumberSeed action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetAutoNumberSeedActionParameters {
  EntityName: string;
  AttributeName: string;
}

/**
 * GetAutoNumberSeed action
 *
 * Unbound action
 */
export class GetAutoNumberSeedAction implements Executable<GetAutoNumberSeedResponse> {
  constructor(public readonly parameters: GetAutoNumberSeedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetAutoNumberSeed`;

    const body = requestBody({
      EntityName: this.parameters.EntityName,
      AttributeName: this.parameters.AttributeName,
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

  async parseResponse(response: Response): Promise<GetAutoNumberSeedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetAutoNumberSeedResponse;
    return (await response.json()) as GetAutoNumberSeedResponse;
  }
}
