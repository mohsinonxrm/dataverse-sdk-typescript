import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the copilotquerytextcontext message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface copilotquerytextcontextRequestParameters {
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
 * copilotquerytextcontext request message
 *
 * Web API Action: copilotquerytextcontext
 */
export class copilotquerytextcontextRequest
  extends OrganizationRequest
  implements Executable<copilotquerytextcontextResponse>
{
  declare readonly Parameters: Readonly<copilotquerytextcontextRequestParameters>;

  constructor(parameters: copilotquerytextcontextRequestParameters) {
    super("copilotquerytextcontext", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/copilotquerytextcontext`;

    const body = requestBody({
      searchMode: this.Parameters.searchMode,
      skip: this.Parameters.skip,
      searchType: this.Parameters.searchType,
      entityParameters: this.Parameters.entityParameters,
      top: this.Parameters.top,
      orderBy: this.Parameters.orderBy,
      options: this.Parameters.options,
      searchText: this.Parameters.searchText,
      totalResultCount: this.Parameters.totalResultCount,
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
    return copilotquerytextcontextResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the copilotquerytextcontext action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface copilotquerytextcontextResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * copilotquerytextcontext response message
 *
 * `result` is the value the copilotquerytextcontext action returns (see {@link copilotquerytextcontextResult}).
 */
export class copilotquerytextcontextResponse extends OrganizationResponse {
  constructor(public result: copilotquerytextcontextResult) {
    super("copilotquerytextcontext");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): copilotquerytextcontextResponse {
    return new copilotquerytextcontextResponse(data as copilotquerytextcontextResult);
  }
}
