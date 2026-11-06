import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpdateOptionalWrapUp message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateOptionalWrapUpRequestParameters {
  Payload: string;
  ApiVersion: string;
}

/**
 * UpdateOptionalWrapUp request message
 *
 * Web API Action: UpdateOptionalWrapUp
 *
 * The first argument is the id of the msdyn_ocsession record to call it on.
 */
export class UpdateOptionalWrapUpRequest
  extends OrganizationRequest
  implements Executable<UpdateOptionalWrapUpResponse>
{
  declare readonly Parameters: Readonly<UpdateOptionalWrapUpRequestParameters>;

  constructor(
    public msdyn_ocsessionId: string,
    parameters: UpdateOptionalWrapUpRequestParameters
  ) {
    super("UpdateOptionalWrapUp", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsessions(${this.msdyn_ocsessionId})/Microsoft.Dynamics.CRM.UpdateOptionalWrapUp`;

    const body = requestBody({
      Payload: this.Parameters.Payload,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<UpdateOptionalWrapUpResponse> {
    // No return value (204 No Content)
    return new UpdateOptionalWrapUpResponse();
  }
}

/**
 * UpdateOptionalWrapUp response message
 */
export class UpdateOptionalWrapUpResponse extends OrganizationResponse {
  constructor() {
    super("UpdateOptionalWrapUp");
  }

  static fromResponse(_data: unknown): UpdateOptionalWrapUpResponse {
    return new UpdateOptionalWrapUpResponse();
  }
}
