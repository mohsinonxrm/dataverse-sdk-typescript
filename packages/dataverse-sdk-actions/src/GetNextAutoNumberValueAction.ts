import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GetNextAutoNumberValue action
 */
export interface GetNextAutoNumberValueResponse {
  NextAutoNumberValue: number;
}

/**
 * Parameters of the GetNextAutoNumberValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetNextAutoNumberValueActionParameters {
  EntityName: string;
  AttributeName: string;
}

/**
 * GetNextAutoNumberValue action
 *
 * Unbound action
 */
export class GetNextAutoNumberValueAction implements Executable<GetNextAutoNumberValueResponse> {
  constructor(public readonly parameters: GetNextAutoNumberValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetNextAutoNumberValue`;

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

  async parseResponse(response: Response): Promise<GetNextAutoNumberValueResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetNextAutoNumberValueResponse;
    return (await response.json()) as GetNextAutoNumberValueResponse;
  }
}
