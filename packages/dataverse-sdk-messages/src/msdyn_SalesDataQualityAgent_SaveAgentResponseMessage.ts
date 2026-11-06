import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_SaveAgentResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_SaveAgentResponseRequestParameters {
  AgentContent: string;
}

/**
 * msdyn_SalesDataQualityAgent_SaveAgentResponse request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_SaveAgentResponse
 */
export class msdyn_SalesDataQualityAgent_SaveAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_SaveAgentResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_SaveAgentResponseRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_SaveAgentResponseRequestParameters) {
    super("msdyn_SalesDataQualityAgent_SaveAgentResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_SaveAgentResponse`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesDataQualityAgent_SaveAgentResponseResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_SaveAgentResponseResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_SaveAgentResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_SaveAgentResponseResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_SalesDataQualityAgent_SaveAgentResponse response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_SaveAgentResponse action returns (see {@link msdyn_SalesDataQualityAgent_SaveAgentResponseResult}).
 */
export class msdyn_SalesDataQualityAgent_SaveAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_SaveAgentResponseResult) {
    super("msdyn_SalesDataQualityAgent_SaveAgentResponse");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_SaveAgentResponseResponse {
    return new msdyn_SalesDataQualityAgent_SaveAgentResponseResponse(
      data as msdyn_SalesDataQualityAgent_SaveAgentResponseResult
    );
  }
}
