import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    public entities: string,
    public top: number,
    public search: string,
    public filter: string,
    public options: string,
    public orderby: string,
    public fuzzy: boolean,
    public propertybag: string
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<searchsuggestResponse> {
    const data = await response.json();
    return searchsuggestResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entities: this.entities,
      top: this.top,
      search: this.search,
      filter: this.filter,
      options: this.options,
      orderby: this.orderby,
      fuzzy: this.fuzzy,
      propertybag: this.propertybag,
    };
  }
}

/**
 * searchsuggest response message
 */
export class searchsuggestResponse extends OrganizationResponse {
  constructor(public result: searchsuggestResponse) {
    super("searchsuggest");
  }

  static fromResponse(data: unknown): searchsuggestResponse {
    return new searchsuggestResponse((data as any).value);
  }
}
