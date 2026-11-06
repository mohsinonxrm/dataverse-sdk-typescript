import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_MigrateSlaResponse as msdyn_MigrateSlaResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_MigrateSlaResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_MigrateSla response message
 */
export class msdyn_MigrateSlaResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateSlaResponseData) {
    super("msdyn_MigrateSla");
  }

  static fromResponse(data: unknown): msdyn_MigrateSlaResponse {
    return new msdyn_MigrateSlaResponse(responseObject<msdyn_MigrateSlaResponseData>(data));
  }
}
