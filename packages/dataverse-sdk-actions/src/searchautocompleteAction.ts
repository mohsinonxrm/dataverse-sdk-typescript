import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from searchautocomplete action
 */
export interface searchautocompleteResponse {
  response: string;
}

/**
 * Parameters of the searchautocomplete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface searchautocompleteActionParameters {
  propertybag?: string;
  filter?: string;
  fuzzy?: boolean;
  options?: string;
  search: string;
  entities?: string;
}

/**
 * searchautocomplete action
 *
 * Unbound action
 */
export class searchautocompleteAction implements Executable<searchautocompleteResponse> {
  constructor(public readonly parameters: searchautocompleteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/searchautocomplete`;

    const body = requestBody({
      propertybag: this.parameters.propertybag,
      filter: this.parameters.filter,
      fuzzy: this.parameters.fuzzy,
      options: this.parameters.options,
      search: this.parameters.search,
      entities: this.parameters.entities,
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

  async parseResponse(response: Response): Promise<searchautocompleteResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as searchautocompleteResponse;
  }
}
