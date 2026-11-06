import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ProcessInvokeCaseProcessingAgentRequestResponse as msdyn_ProcessInvokeCaseProcessingAgentRequestResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ProcessInvokeCaseProcessingAgentRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProcessInvokeCaseProcessingAgentRequestRequestParameters {
  ExtraParams?: string;
  Entity: EntityReference | AnyEntityPayload;
  Actions?: string;
}

/**
 * msdyn_ProcessInvokeCaseProcessingAgentRequest request message
 *
 * Web API Action: msdyn_ProcessInvokeCaseProcessingAgentRequest
 */
export class msdyn_ProcessInvokeCaseProcessingAgentRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProcessInvokeCaseProcessingAgentRequestResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProcessInvokeCaseProcessingAgentRequestRequestParameters>;

  constructor(parameters: msdyn_ProcessInvokeCaseProcessingAgentRequestRequestParameters) {
    super("msdyn_ProcessInvokeCaseProcessingAgentRequest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessInvokeCaseProcessingAgentRequest`;

    const body = requestBody({
      ExtraParams: this.Parameters.ExtraParams,
      Entity: this.Parameters.Entity,
      Actions: this.Parameters.Actions,
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
  ): Promise<msdyn_ProcessInvokeCaseProcessingAgentRequestResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_ProcessInvokeCaseProcessingAgentRequestResponse.fromResponse({});
    return msdyn_ProcessInvokeCaseProcessingAgentRequestResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_ProcessInvokeCaseProcessingAgentRequest response message
 */
export class msdyn_ProcessInvokeCaseProcessingAgentRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProcessInvokeCaseProcessingAgentRequestResponseData) {
    super("msdyn_ProcessInvokeCaseProcessingAgentRequest");
  }

  static fromResponse(data: unknown): msdyn_ProcessInvokeCaseProcessingAgentRequestResponse {
    return new msdyn_ProcessInvokeCaseProcessingAgentRequestResponse(
      responseObject<msdyn_ProcessInvokeCaseProcessingAgentRequestResponseData>(data)
    );
  }
}
