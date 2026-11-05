import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_bookingsetupmetadata, msdyn_configuration } from "./types/index.js";

/**
 * msdyn_initializedefaultclonequery request message
 *
 * Web API Action: msdyn_initializedefaultclonequery
 */
export class msdyn_initializedefaultclonequeryRequest
  extends OrganizationRequest
  implements Executable<msdyn_initializedefaultclonequeryResponse>
{
  constructor(
    public workType: msdyn_bookingsetupmetadata,
    public configuration: msdyn_configuration
  ) {
    super("msdyn_initializedefaultclonequery");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_initializedefaultclonequery`;

    const body: Record<string, unknown> = {
      WorkType: this.workType,
      Configuration: this.configuration,
    };

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
    const data = await response.json();
    return msdyn_initializedefaultclonequeryResponse.fromResponse(data);
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
