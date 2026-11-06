import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AddMembersBatchList action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddMembersBatchListResponse {
  "@odata.context"?: string;
  SkipCountAfter: number;
}

/**
 * Parameters of the AddMembersBatchList action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddMembersBatchListActionParameters {
  ListId?: string;
  FetchXml?: string;
  SkipCount?: number;
}

/**
 * AddMembersBatchList action
 *
 * Unbound action
 */
export class AddMembersBatchListAction implements Executable<AddMembersBatchListResponse> {
  constructor(public readonly parameters: AddMembersBatchListActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddMembersBatchList`;

    const body = requestBody({
      ListId: this.parameters.ListId,
      FetchXml: this.parameters.FetchXml,
      SkipCount: this.parameters.SkipCount,
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

  async parseResponse(response: Response): Promise<AddMembersBatchListResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AddMembersBatchListResponse;
  }
}
