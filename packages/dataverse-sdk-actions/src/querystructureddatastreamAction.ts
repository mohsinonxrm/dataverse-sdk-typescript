import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from querystructureddatastream action
 */
export interface querystructureddatastreamResponse {
  response: string;
}

/**
 * Parameters of the querystructureddatastream action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface querystructureddatastreamActionParameters {
  maxRows: number;
  options: string[];
  additionalProperties: string;
  skill: string;
  queryText: string;
}

/**
 * querystructureddatastream action
 *
 * Unbound action
 */
export class querystructureddatastreamAction implements Executable<querystructureddatastreamResponse> {
  constructor(public readonly parameters: querystructureddatastreamActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/querystructureddatastream`;

    const body = requestBody({
      maxRows: this.parameters.maxRows,
      options: this.parameters.options,
      additionalProperties: this.parameters.additionalProperties,
      skill: this.parameters.skill,
      queryText: this.parameters.queryText,
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

  async parseResponse(response: Response): Promise<querystructureddatastreamResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as querystructureddatastreamResponse;
    return (await response.json()) as querystructureddatastreamResponse;
  }
}
