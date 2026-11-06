import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GenerateFieldDescriptionsResponse as msdyn_GenerateFieldDescriptionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GenerateFieldDescriptions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateFieldDescriptionsRequestParameters {
  msdyn_SimulationId?: string;
  msdyn_CandidateValue: string;
  msdyn_Evidence: string;
  msdyn_RunId?: string;
  msdyn_CorrelationId?: string;
}

/**
 * msdyn_GenerateFieldDescriptions request message
 *
 * Web API Action: msdyn_GenerateFieldDescriptions
 */
export class msdyn_GenerateFieldDescriptionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GenerateFieldDescriptionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GenerateFieldDescriptionsRequestParameters>;

  constructor(parameters: msdyn_GenerateFieldDescriptionsRequestParameters) {
    super("msdyn_GenerateFieldDescriptions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateFieldDescriptions`;

    const body = requestBody({
      msdyn_SimulationId: this.Parameters.msdyn_SimulationId,
      msdyn_CandidateValue: this.Parameters.msdyn_CandidateValue,
      msdyn_Evidence: this.Parameters.msdyn_Evidence,
      msdyn_RunId: this.Parameters.msdyn_RunId,
      msdyn_CorrelationId: this.Parameters.msdyn_CorrelationId,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateFieldDescriptionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GenerateFieldDescriptionsResponse.fromResponse({});
    return msdyn_GenerateFieldDescriptionsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GenerateFieldDescriptions response message
 */
export class msdyn_GenerateFieldDescriptionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GenerateFieldDescriptionsResponseData) {
    super("msdyn_GenerateFieldDescriptions");
  }

  static fromResponse(data: unknown): msdyn_GenerateFieldDescriptionsResponse {
    return new msdyn_GenerateFieldDescriptionsResponse(
      responseObject<msdyn_GenerateFieldDescriptionsResponseData>(data)
    );
  }
}
