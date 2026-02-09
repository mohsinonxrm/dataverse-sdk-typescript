import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from searchsuggest action
 */
export interface searchsuggestResponse {
  response: string;
}

/**
 * searchsuggest action
 *
 * Unbound action
 */
export class searchsuggestAction implements Executable<searchsuggestResponse> {
  constructor(
    public readonly entities: string,
    public readonly top: number,
    public readonly search: string,
    public readonly filter: string,
    public readonly options: string,
    public readonly orderby: string,
    public readonly fuzzy: boolean,
    public readonly propertybag: string
  ) {}

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
    return data as searchsuggestResponse;
  }
}
