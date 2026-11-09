import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UnpublishAIConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnpublishAIConfigurationRequestParameters {
  version: string;
}

/**
 * UnpublishAIConfiguration request message
 *
 * Web API Action: UnpublishAIConfiguration
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class UnpublishAIConfigurationRequest
  extends OrganizationRequest
  implements Executable<UnpublishAIConfigurationResponse>
{
  declare readonly Parameters: Readonly<UnpublishAIConfigurationRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: UnpublishAIConfigurationRequestParameters
  ) {
    super("UnpublishAIConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${odataLiteral.guid(this.msdyn_aiconfigurationId)})/Microsoft.Dynamics.CRM.UnpublishAIConfiguration`;

    const body = requestBody({
      version: this.Parameters.version,
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

  async parseResponse(response: Response): Promise<UnpublishAIConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return UnpublishAIConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the UnpublishAIConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface UnpublishAIConfigurationResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * UnpublishAIConfiguration response message
 *
 * `result` is the value the UnpublishAIConfiguration action returns (see {@link UnpublishAIConfigurationResult}).
 */
export class UnpublishAIConfigurationResponse extends OrganizationResponse {
  constructor(public result: UnpublishAIConfigurationResult) {
    super("UnpublishAIConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): UnpublishAIConfigurationResponse {
    return new UnpublishAIConfigurationResponse(data as UnpublishAIConfigurationResult);
  }
}
