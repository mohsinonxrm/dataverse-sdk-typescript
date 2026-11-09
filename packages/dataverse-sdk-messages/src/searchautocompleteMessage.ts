import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the searchautocomplete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface searchautocompleteRequestParameters {
  fuzzy?: boolean;
  options?: string;
  search: string;
  entities?: string;
  propertybag?: string;
  filter?: string;
}

/**
 * searchautocomplete request message
 *
 * Web API Action: searchautocomplete
 */
export class searchautocompleteRequest
  extends OrganizationRequest
  implements Executable<searchautocompleteResponse>
{
  declare readonly Parameters: Readonly<searchautocompleteRequestParameters>;

  constructor(parameters: searchautocompleteRequestParameters) {
    super("searchautocomplete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/searchautocomplete`;

    const body = requestBody({
      fuzzy: this.Parameters.fuzzy,
      options: this.Parameters.options,
      search: this.Parameters.search,
      entities: this.Parameters.entities,
      propertybag: this.Parameters.propertybag,
      filter: this.Parameters.filter,
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
    return searchautocompleteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the searchautocomplete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface searchautocompleteResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * searchautocomplete response message
 *
 * `result` is the value the searchautocomplete action returns (see {@link searchautocompleteResult}).
 */
export class searchautocompleteResponse extends OrganizationResponse {
  constructor(public result: searchautocompleteResult) {
    super("searchautocomplete");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): searchautocompleteResponse {
    return new searchautocompleteResponse(data as searchautocompleteResult);
  }
}
