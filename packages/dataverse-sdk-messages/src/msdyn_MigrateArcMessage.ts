import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_MigrateArcResponse as msdyn_MigrateArcResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_MigrateArc message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateArcRequestParameters {
  ArcMigrationRequest: string;
}

/**
 * msdyn_MigrateArc request message
 *
 * Web API Action: msdyn_MigrateArc
 */
export class msdyn_MigrateArcRequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateArcResponse>
{
  declare readonly Parameters: Readonly<msdyn_MigrateArcRequestParameters>;

  constructor(parameters: msdyn_MigrateArcRequestParameters) {
    super("msdyn_MigrateArc", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateArc`;

    const body = requestBody({
      ArcMigrationRequest: this.Parameters.ArcMigrationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateArcResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_MigrateArcResponse.fromResponse({});
    return msdyn_MigrateArcResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_MigrateArc response message
 */
export class msdyn_MigrateArcResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateArcResponseData) {
    super("msdyn_MigrateArc");
  }

  static fromResponse(data: unknown): msdyn_MigrateArcResponse {
    return new msdyn_MigrateArcResponse(responseObject<msdyn_MigrateArcResponseData>(data));
  }
}
