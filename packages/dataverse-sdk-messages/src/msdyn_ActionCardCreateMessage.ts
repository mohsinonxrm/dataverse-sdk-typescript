import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ActionCardCreate request message
 *
 * Web API Action: msdyn_ActionCardCreate
 */
export class msdyn_ActionCardCreateRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActionCardCreateResponse>
{
  constructor(public actionCardCreateParams: string) {
    super("msdyn_ActionCardCreate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActionCardCreate`;

    const body: Record<string, unknown> = {
      actionCardCreateParams: this.actionCardCreateParams,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ActionCardCreateResponse> {
    // No return value (204 No Content)
    return new msdyn_ActionCardCreateResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      actionCardCreateParams: this.actionCardCreateParams,
    };
  }
}

/**
 * msdyn_ActionCardCreate response message
 */
export class msdyn_ActionCardCreateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ActionCardCreate");
  }

  static fromResponse(_data: unknown): msdyn_ActionCardCreateResponse {
    return new msdyn_ActionCardCreateResponse();
  }
}
