import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from copilotquerytextcontext action
 */
export interface copilotquerytextcontextResponse {
  response: string;
}

/**
 * Parameters of the copilotquerytextcontext action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface copilotquerytextcontextActionParameters {
  totalResultCount?: boolean;
  orderBy?: string;
  searchMode?: string;
  entityParameters?: string;
  skip?: number;
  top?: number;
  options?: string;
  searchType?: string;
  searchText: string;
}

/**
 * copilotquerytextcontext action
 *
 * Unbound action
 */
export class copilotquerytextcontextAction implements Executable<copilotquerytextcontextResponse> {
  constructor(public readonly parameters: copilotquerytextcontextActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/copilotquerytextcontext`;

    const body = requestBody({
      totalResultCount: this.parameters.totalResultCount,
      orderBy: this.parameters.orderBy,
      searchMode: this.parameters.searchMode,
      entityParameters: this.parameters.entityParameters,
      skip: this.parameters.skip,
      top: this.parameters.top,
      options: this.parameters.options,
      searchType: this.parameters.searchType,
      searchText: this.parameters.searchText,
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

  async parseResponse(response: Response): Promise<copilotquerytextcontextResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as copilotquerytextcontextResponse;
    return (await response.json()) as copilotquerytextcontextResponse;
  }
}
