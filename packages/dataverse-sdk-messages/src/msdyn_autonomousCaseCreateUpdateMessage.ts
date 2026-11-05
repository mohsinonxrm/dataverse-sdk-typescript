import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_autonomousCaseCreateUpdate request message
 *
 * Web API Action: msdyn_autonomousCaseCreateUpdate
 */
export class msdyn_autonomousCaseCreateUpdateRequest
  extends OrganizationRequest
  implements Executable<msdyn_autonomousCaseCreateUpdateResponse>
{
  constructor(
    public autonomousCaseRequest: string,
    public slot__conversation: string[]
  ) {
    super("msdyn_autonomousCaseCreateUpdate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_autonomousCaseCreateUpdate`;

    const body: Record<string, unknown> = {
      autonomousCaseRequest: this.autonomousCaseRequest,
      slot__conversation: this.slot__conversation,
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

  async parseResponse(response: Response): Promise<msdyn_autonomousCaseCreateUpdateResponse> {
    const data = await response.json();
    return msdyn_autonomousCaseCreateUpdateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      autonomousCaseRequest: this.autonomousCaseRequest,
      slot__conversation: this.slot__conversation,
    };
  }
}

/**
 * msdyn_autonomousCaseCreateUpdate response message
 */
export class msdyn_autonomousCaseCreateUpdateResponse extends OrganizationResponse {
  constructor(public result: msdyn_autonomousCaseCreateUpdateResponse) {
    super("msdyn_autonomousCaseCreateUpdate");
  }

  static fromResponse(data: unknown): msdyn_autonomousCaseCreateUpdateResponse {
    return new msdyn_autonomousCaseCreateUpdateResponse((data as any).value);
  }
}
