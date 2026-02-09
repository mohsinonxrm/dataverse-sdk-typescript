import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from searchautocomplete action
 */
export interface searchautocompleteResponse {
  response: string;
}

/**
 * searchautocomplete action
 *
 * Unbound action
 */
export class searchautocompleteAction implements Executable<searchautocompleteResponse> {
  constructor(
    public readonly propertybag: string,
    public readonly filter: string,
    public readonly fuzzy: boolean,
    public readonly options: string,
    public readonly search: string,
    public readonly entities: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/searchautocomplete`;

    const body: Record<string, unknown> = {
      propertybag: this.propertybag,
      filter: this.filter,
      fuzzy: this.fuzzy,
      options: this.options,
      search: this.search,
      entities: this.entities,
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

  async parseResponse(response: Response): Promise<searchautocompleteResponse> {
    const data = await response.json();
    return data as searchautocompleteResponse;
  }
}
