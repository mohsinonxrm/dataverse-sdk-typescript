import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetORReasonExplanationResponse as msdyn_GetORReasonExplanationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetORReasonExplanation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetORReasonExplanationRequestParameters {
  EntityType: number;
  ExplanationObject: string;
  EntityId: string;
}

/**
 * msdyn_GetORReasonExplanation request message
 *
 * Web API Action: msdyn_GetORReasonExplanation
 */
export class msdyn_GetORReasonExplanationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetORReasonExplanationResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetORReasonExplanationRequestParameters>;

  constructor(parameters: msdyn_GetORReasonExplanationRequestParameters) {
    super("msdyn_GetORReasonExplanation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetORReasonExplanation`;

    const body = requestBody({
      EntityType: this.Parameters.EntityType,
      ExplanationObject: this.Parameters.ExplanationObject,
      EntityId: this.Parameters.EntityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetORReasonExplanationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetORReasonExplanationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetORReasonExplanation response message
 */
export class msdyn_GetORReasonExplanationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetORReasonExplanationResponseData) {
    super("msdyn_GetORReasonExplanation");
  }

  static fromResponse(data: unknown): msdyn_GetORReasonExplanationResponse {
    return new msdyn_GetORReasonExplanationResponse(
      responseObject<msdyn_GetORReasonExplanationResponseData>(data)
    );
  }
}
