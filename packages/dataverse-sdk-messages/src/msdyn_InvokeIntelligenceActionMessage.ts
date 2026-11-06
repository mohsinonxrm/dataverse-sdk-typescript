import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_InvokeIntelligenceActionResponse as msdyn_InvokeIntelligenceActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InvokeIntelligenceAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeIntelligenceActionRequestParameters {
  Context?: string;
  entityReference?: EntityReference | AnyEntityPayload;
  ScenarioType: string;
  RequestPayload: string;
}

/**
 * msdyn_InvokeIntelligenceAction request message
 *
 * Web API Action: msdyn_InvokeIntelligenceAction
 */
export class msdyn_InvokeIntelligenceActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeIntelligenceActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeIntelligenceActionRequestParameters>;

  constructor(parameters: msdyn_InvokeIntelligenceActionRequestParameters) {
    super("msdyn_InvokeIntelligenceAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeIntelligenceAction`;

    const body = requestBody({
      Context: this.Parameters.Context,
      entityReference: this.Parameters.entityReference,
      ScenarioType: this.Parameters.ScenarioType,
      RequestPayload: this.Parameters.RequestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeIntelligenceActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InvokeIntelligenceActionResponse.fromResponse({});
    return msdyn_InvokeIntelligenceActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_InvokeIntelligenceAction response message
 */
export class msdyn_InvokeIntelligenceActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeIntelligenceActionResponseData) {
    super("msdyn_InvokeIntelligenceAction");
  }

  static fromResponse(data: unknown): msdyn_InvokeIntelligenceActionResponse {
    return new msdyn_InvokeIntelligenceActionResponse(
      responseObject<msdyn_InvokeIntelligenceActionResponseData>(data)
    );
  }
}
