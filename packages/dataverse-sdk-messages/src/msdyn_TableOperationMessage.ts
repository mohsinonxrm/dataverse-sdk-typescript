import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TableOperation request message
 *
 * Web API Action: msdyn_TableOperation
 */
export class msdyn_TableOperationRequest
  extends OrganizationRequest
  implements Executable<msdyn_TableOperationResponse>
{
  constructor(
    public entityNames: string,
    public scenario: string
  ) {
    super("msdyn_TableOperation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TableOperation`;

    const body: Record<string, unknown> = {
      EntityNames: this.entityNames,
      Scenario: this.scenario,
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

  async parseResponse(response: Response): Promise<msdyn_TableOperationResponse> {
    const data = await response.json();
    return msdyn_TableOperationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityNames: this.entityNames,
      Scenario: this.scenario,
    };
  }
}

/**
 * msdyn_TableOperation response message
 */
export class msdyn_TableOperationResponse extends OrganizationResponse {
  constructor(public result: msdyn_TableOperationResponse) {
    super("msdyn_TableOperation");
  }

  static fromResponse(data: unknown): msdyn_TableOperationResponse {
    return new msdyn_TableOperationResponse((data as any).value);
  }
}
