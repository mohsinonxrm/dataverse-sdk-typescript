import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GetAutoNumberSeed message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetAutoNumberSeedRequestParameters {
  EntityName: string;
  AttributeName: string;
}

/**
 * GetAutoNumberSeed request message
 *
 * Web API Action: GetAutoNumberSeed
 */
export class GetAutoNumberSeedRequest
  extends OrganizationRequest
  implements Executable<GetAutoNumberSeedResponse>
{
  declare readonly Parameters: Readonly<GetAutoNumberSeedRequestParameters>;

  constructor(parameters: GetAutoNumberSeedRequestParameters) {
    super("GetAutoNumberSeed", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetAutoNumberSeed`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      AttributeName: this.Parameters.AttributeName,
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

  async parseResponse(response: Response): Promise<GetAutoNumberSeedResponse> {
    // The body is the complex value, with its @odata.context
    return GetAutoNumberSeedResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetAutoNumberSeed action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetAutoNumberSeedResult {
  "@odata.context"?: string;
  AutoNumberSeedValue: number;
}

/**
 * GetAutoNumberSeed response message
 *
 * `result` is the value the GetAutoNumberSeed action returns (see {@link GetAutoNumberSeedResult}).
 */
export class GetAutoNumberSeedResponse extends OrganizationResponse {
  constructor(public result: GetAutoNumberSeedResult) {
    super("GetAutoNumberSeed");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetAutoNumberSeedResponse {
    return new GetAutoNumberSeedResponse(data as GetAutoNumberSeedResult);
  }
}
