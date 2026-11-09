import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetEntitiesEligibleForRecycleBin request message
 *
 * Web API Action: GetEntitiesEligibleForRecycleBin
 */
export class GetEntitiesEligibleForRecycleBinRequest
  extends OrganizationRequest
  implements Executable<GetEntitiesEligibleForRecycleBinResponse>
{
  constructor() {
    super("GetEntitiesEligibleForRecycleBin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetEntitiesEligibleForRecycleBin`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetEntitiesEligibleForRecycleBinResponse> {
    // The body is the complex value, with its @odata.context
    return GetEntitiesEligibleForRecycleBinResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetEntitiesEligibleForRecycleBin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetEntitiesEligibleForRecycleBinResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * GetEntitiesEligibleForRecycleBin response message
 *
 * `result` is the value the GetEntitiesEligibleForRecycleBin action returns (see {@link GetEntitiesEligibleForRecycleBinResult}).
 */
export class GetEntitiesEligibleForRecycleBinResponse extends OrganizationResponse {
  constructor(public result: GetEntitiesEligibleForRecycleBinResult) {
    super("GetEntitiesEligibleForRecycleBin");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetEntitiesEligibleForRecycleBinResponse {
    return new GetEntitiesEligibleForRecycleBinResponse(
      data as GetEntitiesEligibleForRecycleBinResult
    );
  }
}
