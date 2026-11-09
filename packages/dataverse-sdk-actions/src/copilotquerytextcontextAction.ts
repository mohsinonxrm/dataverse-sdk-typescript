import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the copilotquerytextcontext action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface copilotquerytextcontextResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the copilotquerytextcontext action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface copilotquerytextcontextActionParameters {
  searchMode?: string;
  skip?: number;
  searchType?: string;
  entityParameters?: string;
  top?: number;
  orderBy?: string;
  options?: string;
  searchText: string;
  totalResultCount?: boolean;
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
      searchMode: this.parameters.searchMode,
      skip: this.parameters.skip,
      searchType: this.parameters.searchType,
      entityParameters: this.parameters.entityParameters,
      top: this.parameters.top,
      orderBy: this.parameters.orderBy,
      options: this.parameters.options,
      searchText: this.parameters.searchText,
      totalResultCount: this.parameters.totalResultCount,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as copilotquerytextcontextResponse;
  }
}
