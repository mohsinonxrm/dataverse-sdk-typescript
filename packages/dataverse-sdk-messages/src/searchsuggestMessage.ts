import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { searchsuggestResponse as searchsuggestResponseData } from "./types/index.js";

/**
 * searchsuggest request message
 *
 * Web API Action: searchsuggest
 */
export class searchsuggestRequest
  extends OrganizationRequest
  implements Executable<searchsuggestResponse>
{
  constructor(
    public entities: string | undefined,
    public top: number | undefined,
    public search: string,
    public filter?: string,
    public options?: string,
    public orderby?: string,
    public fuzzy?: boolean,
    public propertybag?: string
  ) {
    super("searchsuggest");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/searchsuggest`;

    const body: Record<string, unknown> = {
      entities: this.entities,
      top: this.top,
      search: this.search,
      filter: this.filter,
      options: this.options,
      orderby: this.orderby,
      fuzzy: this.fuzzy,
      propertybag: this.propertybag,
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

  async parseResponse(response: Response): Promise<searchsuggestResponse> {
    const data = await response.json();
    return searchsuggestResponse.fromResponse(data);
  }
}

/**
 * searchsuggest response message
 */
export class searchsuggestResponse extends OrganizationResponse {
  constructor(public result: searchsuggestResponseData) {
    super("searchsuggest");
  }

  static fromResponse(data: unknown): searchsuggestResponse {
    return new searchsuggestResponse(responseObject<searchsuggestResponseData>(data));
  }
}
