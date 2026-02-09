import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * searchquery request message
 *
 * Web API Action: searchquery
 */
export class searchqueryRequest
  extends OrganizationRequest
  implements Executable<searchqueryResponse>
{
  constructor(
    public options: string,
    public filter: string,
    public propertybag: string,
    public entities: string,
    public search: string,
    public facets: string,
    public skip: number,
    public count: boolean,
    public top: number,
    public orderby: string,
    public semanticquery: string
  ) {
    super("searchquery");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/searchquery`;

    const body: Record<string, unknown> = {
      options: this.options,
      filter: this.filter,
      propertybag: this.propertybag,
      entities: this.entities,
      search: this.search,
      facets: this.facets,
      skip: this.skip,
      count: this.count,
      top: this.top,
      orderby: this.orderby,
      semanticquery: this.semanticquery,
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

  async parseResponse(response: Response): Promise<searchqueryResponse> {
    const data = await response.json();
    return searchqueryResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      options: this.options,
      filter: this.filter,
      propertybag: this.propertybag,
      entities: this.entities,
      search: this.search,
      facets: this.facets,
      skip: this.skip,
      count: this.count,
      top: this.top,
      orderby: this.orderby,
      semanticquery: this.semanticquery,
    };
  }
}

/**
 * searchquery response message
 */
export class searchqueryResponse extends OrganizationResponse {
  constructor(public result: searchqueryResponse) {
    super("searchquery");
  }

  static fromResponse(data: unknown): searchqueryResponse {
    return new searchqueryResponse((data as any).value);
  }
}
