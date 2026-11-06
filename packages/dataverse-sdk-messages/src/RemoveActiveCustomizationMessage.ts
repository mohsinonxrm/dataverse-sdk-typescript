import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { RemoveActiveCustomizationResponse as RemoveActiveCustomizationResponseData } from "./types/index.js";

/**
 * Parameters of the RemoveActiveCustomization message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveActiveCustomizationRequestParameters {
  LogicalName: string;
  Id: string;
}

/**
 * RemoveActiveCustomization request message
 *
 * Web API Action: RemoveActiveCustomization
 */
export class RemoveActiveCustomizationRequest
  extends OrganizationRequest
  implements Executable<RemoveActiveCustomizationResponse>
{
  declare readonly Parameters: Readonly<RemoveActiveCustomizationRequestParameters>;

  constructor(parameters: RemoveActiveCustomizationRequestParameters) {
    super("RemoveActiveCustomization", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveActiveCustomization`;

    const body = requestBody({
      LogicalName: this.Parameters.LogicalName,
      Id: this.Parameters.Id,
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

  async parseResponse(response: Response): Promise<RemoveActiveCustomizationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return RemoveActiveCustomizationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * RemoveActiveCustomization response message
 */
export class RemoveActiveCustomizationResponse extends OrganizationResponse {
  constructor(public result: RemoveActiveCustomizationResponseData) {
    super("RemoveActiveCustomization");
  }

  static fromResponse(data: unknown): RemoveActiveCustomizationResponse {
    return new RemoveActiveCustomizationResponse(
      responseObject<RemoveActiveCustomizationResponseData>(data)
    );
  }
}
