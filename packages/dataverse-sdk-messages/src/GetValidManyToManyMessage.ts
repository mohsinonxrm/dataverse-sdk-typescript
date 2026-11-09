import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetValidManyToMany request message
 *
 * Web API Function: GetValidManyToMany
 */
export class GetValidManyToManyRequest
  extends OrganizationRequest
  implements Executable<GetValidManyToManyResponse>
{
  constructor() {
    super("GetValidManyToMany");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetValidManyToMany`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetValidManyToManyResponse> {
    // The body is the complex value, with its @odata.context
    return GetValidManyToManyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetValidManyToMany function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetValidManyToManyResult {
  "@odata.context"?: string;
  EntityNames: string[];
}

/**
 * GetValidManyToMany response message
 *
 * `result` is the value the GetValidManyToMany function returns (see {@link GetValidManyToManyResult}).
 */
export class GetValidManyToManyResponse extends OrganizationResponse {
  constructor(public result: GetValidManyToManyResult) {
    super("GetValidManyToMany");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetValidManyToManyResponse {
    return new GetValidManyToManyResponse(data as GetValidManyToManyResult);
  }
}
