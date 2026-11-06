import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GetWorkIQTaskStatus action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GetWorkIQTaskStatusResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as GetWorkIQTaskStatusResponse;
  }
}
