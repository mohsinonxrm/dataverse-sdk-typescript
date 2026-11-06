import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesMeetingPreparationResponse as msdyn_SalesMeetingPreparationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesMeetingPreparation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesMeetingPreparationRequestParameters {
  msdyn_sessionId?: string;
  msdyn_activityId?: string;
  msdyn_id: string;
  msdyn_responseFormat?: string;
}

/**
 * msdyn_SalesMeetingPreparation request message
 *
 * Web API Action: msdyn_SalesMeetingPreparation
 */
export class msdyn_SalesMeetingPreparationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesMeetingPreparationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesMeetingPreparationRequestParameters>;

  constructor(parameters: msdyn_SalesMeetingPreparationRequestParameters) {
    super("msdyn_SalesMeetingPreparation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesMeetingPreparation`;

    const body = requestBody({
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
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

  async parseResponse(response: Response): Promise<msdyn_SalesMeetingPreparationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesMeetingPreparationResponse.fromResponse({});
    return msdyn_SalesMeetingPreparationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesMeetingPreparation response message
 */
export class msdyn_SalesMeetingPreparationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesMeetingPreparationResponseData) {
    super("msdyn_SalesMeetingPreparation");
  }

  static fromResponse(data: unknown): msdyn_SalesMeetingPreparationResponse {
    return new msdyn_SalesMeetingPreparationResponse(
      responseObject<msdyn_SalesMeetingPreparationResponseData>(data)
    );
  }
}
