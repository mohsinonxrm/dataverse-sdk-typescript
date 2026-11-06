import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_StartMigrationCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_StartMigrationCustomActionRequestParameters {
  WhatIf?: boolean;
}

/**
 * msdynmkt_StartMigrationCustomAction request message
 *
 * Web API Action: msdynmkt_StartMigrationCustomAction
 */
export class msdynmkt_StartMigrationCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_StartMigrationCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_StartMigrationCustomActionRequestParameters>;

  constructor(parameters: msdynmkt_StartMigrationCustomActionRequestParameters = {}) {
    super("msdynmkt_StartMigrationCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_StartMigrationCustomAction`;

    const body = requestBody({
      WhatIf: this.Parameters.WhatIf,
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

  async parseResponse(response: Response): Promise<msdynmkt_StartMigrationCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_StartMigrationCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_StartMigrationCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_StartMigrationCustomActionResult {
  "@odata.context"?: string;
  ErrorCodes: string;
}

/**
 * msdynmkt_StartMigrationCustomAction response message
 *
 * `result` is the value the msdynmkt_StartMigrationCustomAction action returns (see {@link msdynmkt_StartMigrationCustomActionResult}).
 */
export class msdynmkt_StartMigrationCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_StartMigrationCustomActionResult) {
    super("msdynmkt_StartMigrationCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_StartMigrationCustomActionResponse {
    return new msdynmkt_StartMigrationCustomActionResponse(
      data as msdynmkt_StartMigrationCustomActionResult
    );
  }
}
