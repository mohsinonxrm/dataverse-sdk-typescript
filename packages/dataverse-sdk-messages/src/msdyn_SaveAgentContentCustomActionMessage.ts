import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SaveAgentContentCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveAgentContentCustomActionRequestParameters {
  AgentContent?: string;
}

/**
 * msdyn_SaveAgentContentCustomAction request message
 *
 * Web API Action: msdyn_SaveAgentContentCustomAction
 */
export class msdyn_SaveAgentContentCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveAgentContentCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SaveAgentContentCustomActionRequestParameters>;

  constructor(parameters: msdyn_SaveAgentContentCustomActionRequestParameters = {}) {
    super("msdyn_SaveAgentContentCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveAgentContentCustomAction`;

    const body = requestBody({
      AgentContent: this.Parameters.AgentContent,
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

  async parseResponse(response: Response): Promise<msdyn_SaveAgentContentCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SaveAgentContentCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SaveAgentContentCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveAgentContentCustomActionResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  Response: string;
  StatusCode: number;
}

/**
 * msdyn_SaveAgentContentCustomAction response message
 *
 * `result` is the value the msdyn_SaveAgentContentCustomAction action returns (see {@link msdyn_SaveAgentContentCustomActionResult}).
 */
export class msdyn_SaveAgentContentCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveAgentContentCustomActionResult) {
    super("msdyn_SaveAgentContentCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SaveAgentContentCustomActionResponse {
    return new msdyn_SaveAgentContentCustomActionResponse(
      data as msdyn_SaveAgentContentCustomActionResult
    );
  }
}
