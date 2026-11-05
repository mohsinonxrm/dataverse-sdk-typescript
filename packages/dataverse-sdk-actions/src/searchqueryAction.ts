import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from searchquery action
 */
export interface searchqueryResponse {
  response: string;
}

/**
 * searchquery action
 *
 * Unbound action
 */
export class searchqueryAction implements Executable<searchqueryResponse> {
  constructor(
    public readonly options: string,
    public readonly filter: string,
    public readonly propertybag: string,
    public readonly entities: string,
    public readonly search: string,
    public readonly facets: string,
    public readonly skip: number,
    public readonly count: boolean,
    public readonly top: number,
    public readonly orderby: string,
    public readonly semanticquery: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<searchqueryResponse> {
    const data = await response.json();
    return data as searchqueryResponse;
  }
}
