import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CanBeReferencingResponse as CanBeReferencingResponseData } from "./types/index.js";

/**
 * Parameters of the CanBeReferencing message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CanBeReferencingRequestParameters {
  EntityName: string;
}

/**
 * CanBeReferencing request message
 *
 * Web API Action: CanBeReferencing
 */
export class CanBeReferencingRequest
  extends OrganizationRequest
  implements Executable<CanBeReferencingResponse>
{
  declare readonly Parameters: Readonly<CanBeReferencingRequestParameters>;

  constructor(parameters: CanBeReferencingRequestParameters) {
    super("CanBeReferencing", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanBeReferencing`;

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

  async parseResponse(response: Response): Promise<CanBeReferencingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CanBeReferencingResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * CanBeReferencing response message
 */
export class CanBeReferencingResponse extends OrganizationResponse {
  constructor(public result: CanBeReferencingResponseData) {
    super("CanBeReferencing");
  }

  static fromResponse(data: unknown): CanBeReferencingResponse {
    return new CanBeReferencingResponse(responseObject<CanBeReferencingResponseData>(data));
  }
}
