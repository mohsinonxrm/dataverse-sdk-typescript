import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<copilotquerytextcontextResponse> {
    const data = await response.json();
    return copilotquerytextcontextResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * copilotquerytextcontext response message
 */
export class copilotquerytextcontextResponse extends OrganizationResponse {
  constructor(public result: copilotquerytextcontextResponse) {
    super("copilotquerytextcontext");
  }

  static fromResponse(data: unknown): copilotquerytextcontextResponse {
    return new copilotquerytextcontextResponse((data as any).value);
  }
}
