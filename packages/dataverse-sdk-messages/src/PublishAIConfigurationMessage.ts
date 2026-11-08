import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the PublishAIConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PublishAIConfigurationRequestParameters {
  version: string;
  source?: string;
}

/**
 * PublishAIConfiguration request message
 *
 * Web API Action: PublishAIConfiguration
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class PublishAIConfigurationRequest
  extends OrganizationRequest
  implements Executable<PublishAIConfigurationResponse>
{
  declare readonly Parameters: Readonly<PublishAIConfigurationRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: PublishAIConfigurationRequestParameters
  ) {
    super("PublishAIConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${odataLiteral.guid(this.msdyn_aiconfigurationId)})/Microsoft.Dynamics.CRM.PublishAIConfiguration`;

    const body = requestBody({
      version: this.Parameters.version,
      source: this.Parameters.source,
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

  async parseResponse(response: Response): Promise<PublishAIConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return PublishAIConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PublishAIConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PublishAIConfigurationResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * PublishAIConfiguration response message
 *
 * `result` is the value the PublishAIConfiguration action returns (see {@link PublishAIConfigurationResult}).
 */
export class PublishAIConfigurationResponse extends OrganizationResponse {
  constructor(public result: PublishAIConfigurationResult) {
    super("PublishAIConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PublishAIConfigurationResponse {
    return new PublishAIConfigurationResponse(data as PublishAIConfigurationResult);
  }
}
