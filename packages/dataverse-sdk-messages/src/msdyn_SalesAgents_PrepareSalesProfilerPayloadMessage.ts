import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse as msdyn_SalesAgents_PrepareSalesProfilerPayloadResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_PrepareSalesProfilerPayload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_PrepareSalesProfilerPayloadRequestParameters {
  msdyn_SalesAgentRunId: string;
}

/**
 * msdyn_SalesAgents_PrepareSalesProfilerPayload request message
 *
 * Web API Action: msdyn_SalesAgents_PrepareSalesProfilerPayload
 */
export class msdyn_SalesAgents_PrepareSalesProfilerPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_PrepareSalesProfilerPayloadRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_PrepareSalesProfilerPayloadRequestParameters) {
    super("msdyn_SalesAgents_PrepareSalesProfilerPayload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_PrepareSalesProfilerPayload`;

    const body = requestBody({
      msdyn_SalesAgentRunId: this.Parameters.msdyn_SalesAgentRunId,
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
  ): Promise<msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse.fromResponse({});
    return msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_PrepareSalesProfilerPayload response message
 */
export class msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_PrepareSalesProfilerPayloadResponseData) {
    super("msdyn_SalesAgents_PrepareSalesProfilerPayload");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse {
    return new msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse(
      responseObject<msdyn_SalesAgents_PrepareSalesProfilerPayloadResponseData>(data)
    );
  }
}
