import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_MigrateArcResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_MigrateArc action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MigrateArcResult {
  "@odata.context"?: string;
  Exception: string;
  OutputString: string;
}

/**
 * msdyn_MigrateArc response message
 *
 * `result` is the value the msdyn_MigrateArc action returns (see {@link msdyn_MigrateArcResult}).
 */
export class msdyn_MigrateArcResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateArcResult) {
    super("msdyn_MigrateArc");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_MigrateArcResponse {
    return new msdyn_MigrateArcResponse(data as msdyn_MigrateArcResult);
  }
}
