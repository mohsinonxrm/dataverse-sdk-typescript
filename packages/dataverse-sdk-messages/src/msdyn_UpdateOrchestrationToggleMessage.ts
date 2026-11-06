import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateOrchestrationToggle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateOrchestrationToggleRequestParameters {
  IsEnabled: boolean;
}

/**
 * msdyn_UpdateOrchestrationToggle request message
 *
 * Web API Action: msdyn_UpdateOrchestrationToggle
 */
export class msdyn_UpdateOrchestrationToggleRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateOrchestrationToggleResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateOrchestrationToggleRequestParameters>;

  constructor(parameters: msdyn_UpdateOrchestrationToggleRequestParameters) {
    super("msdyn_UpdateOrchestrationToggle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateOrchestrationToggle`;

    const body = requestBody({
      IsEnabled: this.Parameters.IsEnabled,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateOrchestrationToggleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateOrchestrationToggleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateOrchestrationToggle action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateOrchestrationToggleResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  Status: number;
}

/**
 * msdyn_UpdateOrchestrationToggle response message
 *
 * `result` is the value the msdyn_UpdateOrchestrationToggle action returns (see {@link msdyn_UpdateOrchestrationToggleResult}).
 */
export class msdyn_UpdateOrchestrationToggleResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateOrchestrationToggleResult) {
    super("msdyn_UpdateOrchestrationToggle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateOrchestrationToggleResponse {
    return new msdyn_UpdateOrchestrationToggleResponse(
      data as msdyn_UpdateOrchestrationToggleResult
    );
  }
}
