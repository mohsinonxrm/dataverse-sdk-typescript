import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { searchautocompleteResponse as searchautocompleteResponseData } from "./types/index.js";

/**
 * Parameters of the searchautocomplete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface searchautocompleteRequestParameters {
  propertybag?: string;
  filter?: string;
  fuzzy?: boolean;
  options?: string;
  search: string;
  entities?: string;
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
      propertybag: this.Parameters.propertybag,
      filter: this.Parameters.filter,
      fuzzy: this.Parameters.fuzzy,
      options: this.Parameters.options,
      search: this.Parameters.search,
      entities: this.Parameters.entities,
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
    // 204 No Content is an empty result
    if (response.status === 204) return searchautocompleteResponse.fromResponse({});
    return searchautocompleteResponse.fromResponse(await response.json());
  }
}

/**
 * searchautocomplete response message
 */
export class searchautocompleteResponse extends OrganizationResponse {
  constructor(public result: searchautocompleteResponseData) {
    super("searchautocomplete");
  }

  static fromResponse(data: unknown): searchautocompleteResponse {
    return new searchautocompleteResponse(responseObject<searchautocompleteResponseData>(data));
  }
}
