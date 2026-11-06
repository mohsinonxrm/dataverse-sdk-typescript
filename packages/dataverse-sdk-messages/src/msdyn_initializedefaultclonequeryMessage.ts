import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_bookingsetupmetadata, msdyn_configuration } from "./types/index.js";

/**
 * Parameters of the msdyn_initializedefaultclonequery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_initializedefaultclonequeryRequestParameters {
  WorkType: EntityReference | EntityPayload<msdyn_bookingsetupmetadata>;
  Configuration?: EntityReference | EntityPayload<msdyn_configuration>;
}

/**
 * msdyn_initializedefaultclonequery request message
 *
 * Web API Action: msdyn_initializedefaultclonequery
 */
export class msdyn_initializedefaultclonequeryRequest
  extends OrganizationRequest
  implements Executable<msdyn_initializedefaultclonequeryResponse>
{
  declare readonly Parameters: Readonly<msdyn_initializedefaultclonequeryRequestParameters>;

  constructor(parameters: msdyn_initializedefaultclonequeryRequestParameters) {
    super("msdyn_initializedefaultclonequery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_initializedefaultclonequery`;

    const body = requestBody({
      WorkType: this.Parameters.WorkType,
      Configuration: this.Parameters.Configuration,
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

  async parseResponse(response: Response): Promise<msdyn_initializedefaultclonequeryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_initializedefaultclonequeryResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_initializedefaultclonequery response message
 */
export class msdyn_initializedefaultclonequeryResponse extends OrganizationResponse {
  constructor(public result: msdyn_configuration) {
    super("msdyn_initializedefaultclonequery");
  }

  static fromResponse(data: unknown): msdyn_initializedefaultclonequeryResponse {
    return new msdyn_initializedefaultclonequeryResponse(responseObject<msdyn_configuration>(data));
  }
}
