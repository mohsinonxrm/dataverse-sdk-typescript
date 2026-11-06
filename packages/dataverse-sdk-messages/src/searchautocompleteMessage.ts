import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { searchautocompleteResponse as searchautocompleteResponseData } from "./types/index.js";

/**
 * searchautocomplete request message
 *
 * Web API Action: searchautocomplete
 */
export class searchautocompleteRequest
  extends OrganizationRequest
  implements Executable<searchautocompleteResponse>
{
  constructor(
    public propertybag: string | undefined,
    public filter: string | undefined,
    public fuzzy: boolean | undefined,
    public options: string | undefined,
    public search: string,
    public entities?: string
  ) {
    super("searchautocomplete");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<searchautocompleteResponse> {
    const data = await response.json();
    return searchautocompleteResponse.fromResponse(data);
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
