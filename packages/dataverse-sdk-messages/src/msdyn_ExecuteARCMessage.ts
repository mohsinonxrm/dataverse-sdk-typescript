import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_ExecuteARCResponse as msdyn_ExecuteARCResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ExecuteARCResponse> {
    const data = await response.json();
    return msdyn_ExecuteARCResponse.fromResponse(data);
  }
}

/**
 * msdyn_ExecuteARC response message
 */
export class msdyn_ExecuteARCResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteARCResponseData) {
    super("msdyn_ExecuteARC");
  }

  static fromResponse(data: unknown): msdyn_ExecuteARCResponse {
    return new msdyn_ExecuteARCResponse(responseObject<msdyn_ExecuteARCResponseData>(data));
  }
}
