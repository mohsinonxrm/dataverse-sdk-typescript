import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PostCreateAutonomousEmail request message
 *
 * Web API Action: msdyn_PostCreateAutonomousEmail
 */
export class msdyn_PostCreateAutonomousEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_PostCreateAutonomousEmailResponse>
{
  constructor(public emailGuid: string) {
    super("msdyn_PostCreateAutonomousEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostCreateAutonomousEmail`;

    const body: Record<string, unknown> = {
      EmailGuid: this.emailGuid,
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

  async parseResponse(response: Response): Promise<msdyn_PostCreateAutonomousEmailResponse> {
    // No return value (204 No Content)
    return new msdyn_PostCreateAutonomousEmailResponse();
  }
}

/**
 * msdyn_PostCreateAutonomousEmail response message
 */
export class msdyn_PostCreateAutonomousEmailResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PostCreateAutonomousEmail");
  }

  static fromResponse(_data: unknown): msdyn_PostCreateAutonomousEmailResponse {
    return new msdyn_PostCreateAutonomousEmailResponse();
  }
}
