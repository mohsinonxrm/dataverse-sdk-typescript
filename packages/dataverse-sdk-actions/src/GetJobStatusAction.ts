import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GetJobStatus action
 */
export interface GetJobStatusResponse {
  response: string;
}

/**
 * Parameters of the GetJobStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetJobStatusActionParameters {
  istrain: boolean;
  correlationid?: string;
  aimodelid?: string;
}

/**
 * GetJobStatus action
 *
 * Unbound action
 */
export class GetJobStatusAction implements Executable<GetJobStatusResponse> {
  constructor(public readonly parameters: GetJobStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetJobStatus`;

    const body = requestBody({
      istrain: this.parameters.istrain,
      correlationid: this.parameters.correlationid,
      aimodelid: this.parameters.aimodelid,
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

  async parseResponse(response: Response): Promise<GetJobStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GetJobStatusResponse;
  }
}
