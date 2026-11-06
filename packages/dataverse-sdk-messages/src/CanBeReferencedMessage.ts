import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CanBeReferencedResponse as CanBeReferencedResponseData } from "./types/index.js";

/**
 * Parameters of the CanBeReferenced message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CanBeReferencedRequestParameters {
  EntityName: string;
}

/**
 * CanBeReferenced request message
 *
 * Web API Action: CanBeReferenced
 */
export class CanBeReferencedRequest
  extends OrganizationRequest
  implements Executable<CanBeReferencedResponse>
{
  declare readonly Parameters: Readonly<CanBeReferencedRequestParameters>;

  constructor(parameters: CanBeReferencedRequestParameters) {
    super("CanBeReferenced", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanBeReferenced`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
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

  async parseResponse(response: Response): Promise<CanBeReferencedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CanBeReferencedResponse.fromResponse({});
    return CanBeReferencedResponse.fromResponse(await response.json());
  }
}

/**
 * CanBeReferenced response message
 */
export class CanBeReferencedResponse extends OrganizationResponse {
  constructor(public result: CanBeReferencedResponseData) {
    super("CanBeReferenced");
  }

  static fromResponse(data: unknown): CanBeReferencedResponse {
    return new CanBeReferencedResponse(responseObject<CanBeReferencedResponseData>(data));
  }
}
