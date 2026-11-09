import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrievePersonalizationFilters message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrievePersonalizationFiltersRequestParameters {
  AttributesToFilter: string;
}

/**
 * msdyn_RetrievePersonalizationFilters request message
 *
 * Web API Action: msdyn_RetrievePersonalizationFilters
 */
export class msdyn_RetrievePersonalizationFiltersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrievePersonalizationFiltersResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrievePersonalizationFiltersRequestParameters>;

  constructor(parameters: msdyn_RetrievePersonalizationFiltersRequestParameters) {
    super("msdyn_RetrievePersonalizationFilters", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrievePersonalizationFilters`;

    const body = requestBody({
      AttributesToFilter: this.Parameters.AttributesToFilter,
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

  async parseResponse(response: Response): Promise<msdyn_RetrievePersonalizationFiltersResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrievePersonalizationFiltersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrievePersonalizationFilters action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrievePersonalizationFiltersResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RetrievePersonalizationFilters response message
 *
 * `result` is the value the msdyn_RetrievePersonalizationFilters action returns (see {@link msdyn_RetrievePersonalizationFiltersResult}).
 */
export class msdyn_RetrievePersonalizationFiltersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrievePersonalizationFiltersResult) {
    super("msdyn_RetrievePersonalizationFilters");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrievePersonalizationFiltersResponse {
    return new msdyn_RetrievePersonalizationFiltersResponse(
      data as msdyn_RetrievePersonalizationFiltersResult
    );
  }
}
