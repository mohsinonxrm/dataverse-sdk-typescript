import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ActionCardCreate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActionCardCreateRequestParameters {
  actionCardCreateParams: string;
}

/**
 * msdyn_ActionCardCreate request message
 *
 * Web API Action: msdyn_ActionCardCreate
 */
export class msdyn_ActionCardCreateRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActionCardCreateResponse>
{
  declare readonly Parameters: Readonly<msdyn_ActionCardCreateRequestParameters>;

  constructor(parameters: msdyn_ActionCardCreateRequestParameters) {
    super("msdyn_ActionCardCreate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActionCardCreate`;

    const body = requestBody({
      actionCardCreateParams: this.Parameters.actionCardCreateParams,
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

  parseResponse(_response: Response): Promise<msdyn_ActionCardCreateResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_ActionCardCreateResponse());
  }
}

/**
 * msdyn_ActionCardCreate response message
 */
export class msdyn_ActionCardCreateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ActionCardCreate");
  }

  static fromResponse(_data?: unknown): msdyn_ActionCardCreateResponse {
    return new msdyn_ActionCardCreateResponse();
  }
}
