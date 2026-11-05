import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { copilotquerytextcontextResponse as copilotquerytextcontextResponseData } from "./types/index.js";

/**
 * copilotquerytextcontext request message
 *
 * Web API Action: copilotquerytextcontext
 */
export class copilotquerytextcontextRequest
  extends OrganizationRequest
  implements Executable<copilotquerytextcontextResponse>
{
  constructor(
    public totalResultCount: boolean,
    public orderBy: string,
    public searchMode: string,
    public entityParameters: string,
    public skip: number,
    public top: number,
    public options: string,
    public searchType: string,
    public searchText: string
  ) {
    super("copilotquerytextcontext");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/copilotquerytextcontext`;

    const body: Record<string, unknown> = {
      totalResultCount: this.totalResultCount,
      orderBy: this.orderBy,
      searchMode: this.searchMode,
      entityParameters: this.entityParameters,
      skip: this.skip,
      top: this.top,
      options: this.options,
      searchType: this.searchType,
      searchText: this.searchText,
    };

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
    const data = await response.json();
    return copilotquerytextcontextResponse.fromResponse(data);
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
