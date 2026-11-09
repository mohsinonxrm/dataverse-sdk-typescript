import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_PostCreateAutonomousEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PostCreateAutonomousEmailRequestParameters {
  EmailGuid: string;
}

/**
 * msdyn_PostCreateAutonomousEmail request message
 *
 * Web API Action: msdyn_PostCreateAutonomousEmail
 */
export class msdyn_PostCreateAutonomousEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_PostCreateAutonomousEmailResponse>
{
  declare readonly Parameters: Readonly<msdyn_PostCreateAutonomousEmailRequestParameters>;

  constructor(parameters: msdyn_PostCreateAutonomousEmailRequestParameters) {
    super("msdyn_PostCreateAutonomousEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostCreateAutonomousEmail`;

    const body = requestBody({
      EmailGuid: this.Parameters.EmailGuid,
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

  parseResponse(_response: Response): Promise<msdyn_PostCreateAutonomousEmailResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_PostCreateAutonomousEmailResponse());
  }
}

/**
 * msdyn_PostCreateAutonomousEmail response message
 */
export class msdyn_PostCreateAutonomousEmailResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PostCreateAutonomousEmail");
  }

  static fromResponse(_data?: unknown): msdyn_PostCreateAutonomousEmailResponse {
    return new msdyn_PostCreateAutonomousEmailResponse();
  }
}
