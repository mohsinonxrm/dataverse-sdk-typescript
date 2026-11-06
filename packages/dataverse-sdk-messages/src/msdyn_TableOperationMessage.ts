import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TableOperationResponse as msdyn_TableOperationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TableOperation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TableOperationRequestParameters {
  EntityNames?: string;
  Scenario: string;
}

/**
 * msdyn_TableOperation request message
 *
 * Web API Action: msdyn_TableOperation
 */
export class msdyn_TableOperationRequest
  extends OrganizationRequest
  implements Executable<msdyn_TableOperationResponse>
{
  declare readonly Parameters: Readonly<msdyn_TableOperationRequestParameters>;

  constructor(parameters: msdyn_TableOperationRequestParameters) {
    super("msdyn_TableOperation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TableOperation`;

    const body = requestBody({
      EntityNames: this.Parameters.EntityNames,
      Scenario: this.Parameters.Scenario,
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

  async parseResponse(response: Response): Promise<msdyn_TableOperationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TableOperationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_TableOperation response message
 */
export class msdyn_TableOperationResponse extends OrganizationResponse {
  constructor(public result: msdyn_TableOperationResponseData) {
    super("msdyn_TableOperation");
  }

  static fromResponse(data: unknown): msdyn_TableOperationResponse {
    return new msdyn_TableOperationResponse(responseObject<msdyn_TableOperationResponseData>(data));
  }
}
