import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AddMembersBatchList action
 */
export interface AddMembersBatchListResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AddMembersBatchListResponse;
  }
}
