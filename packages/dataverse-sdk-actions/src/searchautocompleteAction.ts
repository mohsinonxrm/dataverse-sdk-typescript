import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the searchautocomplete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface searchautocompleteResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the searchautocomplete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface searchautocompleteActionParameters {
  fuzzy?: boolean;
  options?: string;
  search: string;
  entities?: string;
  propertybag?: string;
  filter?: string;
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
      fuzzy: this.parameters.fuzzy,
      options: this.parameters.options,
      search: this.parameters.search,
      entities: this.parameters.entities,
      propertybag: this.parameters.propertybag,
      filter: this.parameters.filter,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as searchautocompleteResponse;
  }
}
