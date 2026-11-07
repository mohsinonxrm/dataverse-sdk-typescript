import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_MigrateSla message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateSlaRequestParameters {
  SlaMigrationRequest: string;
}

/**
 * msdyn_MigrateSla request message
 *
 * Web API Action: msdyn_MigrateSla
 */
export class msdyn_MigrateSlaRequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateSlaResponse>
{
  declare readonly Parameters: Readonly<msdyn_MigrateSlaRequestParameters>;

  constructor(parameters: msdyn_MigrateSlaRequestParameters) {
    super("msdyn_MigrateSla", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateSla`;

    const body = requestBody({
      SlaMigrationRequest: this.Parameters.SlaMigrationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateSlaResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_MigrateSlaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_MigrateSla action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MigrateSlaResult {
  "@odata.context"?: string;
  Exception: string;
  OutputString: string;
}

/**
 * msdyn_MigrateSla response message
 *
 * `result` is the value the msdyn_MigrateSla action returns (see {@link msdyn_MigrateSlaResult}).
 */
export class msdyn_MigrateSlaResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateSlaResult) {
    super("msdyn_MigrateSla");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_MigrateSlaResponse {
    return new msdyn_MigrateSlaResponse(data as msdyn_MigrateSlaResult);
  }
}
