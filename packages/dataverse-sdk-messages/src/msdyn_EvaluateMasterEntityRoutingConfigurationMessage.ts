import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_EvaluateMasterEntityRoutingConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EvaluateMasterEntityRoutingConfigurationRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_EvaluateMasterEntityRoutingConfiguration request message
 *
 * Web API Action: msdyn_EvaluateMasterEntityRoutingConfiguration
 */
export class msdyn_EvaluateMasterEntityRoutingConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_EvaluateMasterEntityRoutingConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_EvaluateMasterEntityRoutingConfigurationRequestParameters>;

  constructor(parameters: msdyn_EvaluateMasterEntityRoutingConfigurationRequestParameters) {
    super("msdyn_EvaluateMasterEntityRoutingConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EvaluateMasterEntityRoutingConfiguration`;

    const body = requestBody({
      Target: this.Parameters.Target,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_EvaluateMasterEntityRoutingConfigurationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_EvaluateMasterEntityRoutingConfigurationResponse());
  }
}

/**
 * msdyn_EvaluateMasterEntityRoutingConfiguration response message
 */
export class msdyn_EvaluateMasterEntityRoutingConfigurationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_EvaluateMasterEntityRoutingConfiguration");
  }

  static fromResponse(_data?: unknown): msdyn_EvaluateMasterEntityRoutingConfigurationResponse {
    return new msdyn_EvaluateMasterEntityRoutingConfigurationResponse();
  }
}
