import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { copilotquerytextcontextResponse as copilotquerytextcontextResponseData } from "./types/index.js";

/**
 * Parameters of the copilotquerytextcontext message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface copilotquerytextcontextRequestParameters {
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
      totalResultCount: this.Parameters.totalResultCount,
      orderBy: this.Parameters.orderBy,
      searchMode: this.Parameters.searchMode,
      entityParameters: this.Parameters.entityParameters,
      skip: this.Parameters.skip,
      top: this.Parameters.top,
      options: this.Parameters.options,
      searchType: this.Parameters.searchType,
      searchText: this.Parameters.searchText,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return copilotquerytextcontextResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * copilotquerytextcontext response message
 */
export class copilotquerytextcontextResponse extends OrganizationResponse {
  constructor(public result: copilotquerytextcontextResponseData) {
    super("copilotquerytextcontext");
  }

  static fromResponse(data: unknown): copilotquerytextcontextResponse {
    return new copilotquerytextcontextResponse(
      responseObject<copilotquerytextcontextResponseData>(data)
    );
  }
}
