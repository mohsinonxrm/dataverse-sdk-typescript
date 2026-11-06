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
    // 204 No Content is an empty result
    if (response.status === 204) return copilotquerytextcontextResponse.fromResponse({});
    return copilotquerytextcontextResponse.fromResponse(await response.json());
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
