import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ValidateAIConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateAIConfigurationRequestParameters {
  version: string;
  aiconfigurationId: string;
}

/**
 * ValidateAIConfiguration request message
 *
 * Web API Action: ValidateAIConfiguration
 */
export class ValidateAIConfigurationRequest
  extends OrganizationRequest
  implements Executable<ValidateAIConfigurationResponse>
{
  declare readonly Parameters: Readonly<ValidateAIConfigurationRequestParameters>;

  constructor(parameters: ValidateAIConfigurationRequestParameters) {
    super("ValidateAIConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateAIConfiguration`;

    const body = requestBody({
      version: this.Parameters.version,
      aiconfigurationId: this.Parameters.aiconfigurationId,
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

  async parseResponse(response: Response): Promise<ValidateAIConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return ValidateAIConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ValidateAIConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ValidateAIConfigurationResult {
  "@odata.context"?: string;
  result: string;
}

/**
 * ValidateAIConfiguration response message
 *
 * `result` is the value the ValidateAIConfiguration action returns (see {@link ValidateAIConfigurationResult}).
 */
export class ValidateAIConfigurationResponse extends OrganizationResponse {
  constructor(public result: ValidateAIConfigurationResult) {
    super("ValidateAIConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ValidateAIConfigurationResponse {
    return new ValidateAIConfigurationResponse(data as ValidateAIConfigurationResult);
  }
}
