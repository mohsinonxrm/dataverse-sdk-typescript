import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GetAutoNumberSeed action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetAutoNumberSeedResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetAutoNumberSeedResponse;
  }
}
