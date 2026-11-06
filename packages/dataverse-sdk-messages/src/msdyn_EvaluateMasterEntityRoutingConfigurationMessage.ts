import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * msdyn_EvaluateMasterEntityRoutingConfiguration request message
 *
 * Web API Action: msdyn_EvaluateMasterEntityRoutingConfiguration
 */
export class msdyn_EvaluateMasterEntityRoutingConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_EvaluateMasterEntityRoutingConfigurationResponse>
{
  constructor(public target: EntityReference | AnyEntityPayload) {
    super("msdyn_EvaluateMasterEntityRoutingConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EvaluateMasterEntityRoutingConfiguration`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_EvaluateMasterEntityRoutingConfigurationResponse> {
    // No return value (204 No Content)
    return new msdyn_EvaluateMasterEntityRoutingConfigurationResponse();
  }
}

/**
 * msdyn_EvaluateMasterEntityRoutingConfiguration response message
 */
export class msdyn_EvaluateMasterEntityRoutingConfigurationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_EvaluateMasterEntityRoutingConfiguration");
  }

  static fromResponse(_data: unknown): msdyn_EvaluateMasterEntityRoutingConfigurationResponse {
    return new msdyn_EvaluateMasterEntityRoutingConfigurationResponse();
  }
}
