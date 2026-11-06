import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ClassifySegments message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ClassifySegmentsRequestParameters {
  RegardingEntityId?: string;
  RegardingEntityName?: string;
}

/**
 * msdyn_ClassifySegments request message
 *
 * Web API Action: msdyn_ClassifySegments
 */
export class msdyn_ClassifySegmentsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ClassifySegmentsResponse>
{
  declare readonly Parameters: Readonly<msdyn_ClassifySegmentsRequestParameters>;

  constructor(parameters: msdyn_ClassifySegmentsRequestParameters = {}) {
    super("msdyn_ClassifySegments", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ClassifySegments`;

    const body = requestBody({
      RegardingEntityId: this.Parameters.RegardingEntityId,
      RegardingEntityName: this.Parameters.RegardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_ClassifySegmentsResponse> {
    // No return value (204 No Content)
    return new msdyn_ClassifySegmentsResponse();
  }
}

/**
 * msdyn_ClassifySegments response message
 */
export class msdyn_ClassifySegmentsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ClassifySegments");
  }

  static fromResponse(_data: unknown): msdyn_ClassifySegmentsResponse {
    return new msdyn_ClassifySegmentsResponse();
  }
}
