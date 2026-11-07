import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_CreateDefaultTemplateInSharepoint request message
 *
 * Web API Action: msdyn_SalesAgents_CreateDefaultTemplateInSharepoint
 */
export class msdyn_SalesAgents_CreateDefaultTemplateInSharepointRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse>
{
  constructor() {
    super("msdyn_SalesAgents_CreateDefaultTemplateInSharepoint");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateDefaultTemplateInSharepoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_CreateDefaultTemplateInSharepoint action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_CreateDefaultTemplateInSharepointResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_CreateDefaultTemplateInSharepoint response message
 *
 * `result` is the value the msdyn_SalesAgents_CreateDefaultTemplateInSharepoint action returns (see {@link msdyn_SalesAgents_CreateDefaultTemplateInSharepointResult}).
 */
export class msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_CreateDefaultTemplateInSharepointResult) {
    super("msdyn_SalesAgents_CreateDefaultTemplateInSharepoint");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse {
    return new msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse(
      data as msdyn_SalesAgents_CreateDefaultTemplateInSharepointResult
    );
  }
}
