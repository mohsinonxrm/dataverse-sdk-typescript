import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GetWorkIQTaskStatus action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface GetWorkIQTaskStatusResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the GetWorkIQTaskStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetWorkIQTaskStatusActionParameters {
  workspaceId: string;
  sessionId: string;
}

/**
 * GetWorkIQTaskStatus action
 *
 * Unbound action
 */
export class GetWorkIQTaskStatusAction implements Executable<GetWorkIQTaskStatusResponse> {
  constructor(public readonly parameters: GetWorkIQTaskStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetWorkIQTaskStatus`;

    const body = requestBody({
      workspaceId: this.parameters.workspaceId,
      sessionId: this.parameters.sessionId,
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

  async parseResponse(response: Response): Promise<GetWorkIQTaskStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetWorkIQTaskStatusResponse;
    return (await response.json()) as GetWorkIQTaskStatusResponse;
  }
}
