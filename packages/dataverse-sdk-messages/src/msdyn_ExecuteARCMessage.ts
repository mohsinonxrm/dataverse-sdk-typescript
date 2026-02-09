import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_ExecuteARC request message
 *
 * Web API Action: msdyn_ExecuteARC
 */
export class msdyn_ExecuteARCRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteARCResponse>
{
  constructor(
    public createdEntityReference: EntityReference,
    public ruleId: string
  ) {
    super("msdyn_ExecuteARC");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteARC`;

    const body: Record<string, unknown> = {
      CreatedEntityReference: this.createdEntityReference,
      RuleId: this.ruleId,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteARCResponse> {
    const data = await response.json();
    return msdyn_ExecuteARCResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CreatedEntityReference: this.createdEntityReference,
      RuleId: this.ruleId,
    };
  }
}

/**
 * msdyn_ExecuteARC response message
 */
export class msdyn_ExecuteARCResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteARCResponse) {
    super("msdyn_ExecuteARC");
  }

  static fromResponse(data: unknown): msdyn_ExecuteARCResponse {
    return new msdyn_ExecuteARCResponse((data as any).value);
  }
}
