import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_StartMigrationCustomActionResponse as msdynmkt_StartMigrationCustomActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_StartMigrationCustomActionResponse.fromResponse({});
    return msdynmkt_StartMigrationCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_StartMigrationCustomAction response message
 */
export class msdynmkt_StartMigrationCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_StartMigrationCustomActionResponseData) {
    super("msdynmkt_StartMigrationCustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_StartMigrationCustomActionResponse {
    return new msdynmkt_StartMigrationCustomActionResponse(
      responseObject<msdynmkt_StartMigrationCustomActionResponseData>(data)
    );
  }
}
