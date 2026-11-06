import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_assignentity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_assignentityRequestParameters {
  RegardingEntityId: string;
  RegardingEntityName: string;
  SegmentId: string;
  CorrelationId?: string;
}

/**
 * msdyn_assignentity request message
 *
 * Web API Action: msdyn_assignentity
 */
export class msdyn_assignentityRequest
  extends OrganizationRequest
  implements Executable<msdyn_assignentityResponse>
{
  declare readonly Parameters: Readonly<msdyn_assignentityRequestParameters>;

  constructor(parameters: msdyn_assignentityRequestParameters) {
    super("msdyn_assignentity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_assignentity`;

    const body = requestBody({
      RegardingEntityId: this.Parameters.RegardingEntityId,
      RegardingEntityName: this.Parameters.RegardingEntityName,
      SegmentId: this.Parameters.SegmentId,
      CorrelationId: this.Parameters.CorrelationId,
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

  async parseResponse(response: Response): Promise<msdyn_assignentityResponse> {
    // No return value (204 No Content)
    return new msdyn_assignentityResponse();
  }
}

/**
 * msdyn_assignentity response message
 */
export class msdyn_assignentityResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_assignentity");
  }

  static fromResponse(_data: unknown): msdyn_assignentityResponse {
    return new msdyn_assignentityResponse();
  }
}
