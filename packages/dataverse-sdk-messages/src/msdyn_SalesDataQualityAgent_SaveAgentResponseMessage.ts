import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesDataQualityAgent_SaveAgentResponseResponse as msdyn_SalesDataQualityAgent_SaveAgentResponseResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_SaveAgentResponseResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_SaveAgentResponseResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesDataQualityAgent_SaveAgentResponse response message
 */
export class msdyn_SalesDataQualityAgent_SaveAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_SaveAgentResponseResponseData) {
    super("msdyn_SalesDataQualityAgent_SaveAgentResponse");
  }

  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_SaveAgentResponseResponse {
    return new msdyn_SalesDataQualityAgent_SaveAgentResponseResponse(
      responseObject<msdyn_SalesDataQualityAgent_SaveAgentResponseResponseData>(data)
    );
  }
}
