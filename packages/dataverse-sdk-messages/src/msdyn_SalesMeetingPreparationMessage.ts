import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesMeetingPreparationResponse as msdyn_SalesMeetingPreparationResponseData } from "./types/index.js";

/**
 * msdyn_SalesMeetingPreparation request message
 *
 * Web API Action: msdyn_SalesMeetingPreparation
 */
export class msdyn_SalesMeetingPreparationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesMeetingPreparationResponse>
{
  constructor(
    public msdyn_sessionId: string,
    public msdyn_activityId: string,
    public msdyn_id: string,
    public msdyn_responseFormat: string
  ) {
    super("msdyn_SalesMeetingPreparation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesMeetingPreparation`;

    const body: Record<string, unknown> = {
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_id: this.msdyn_id,
      msdyn_responseFormat: this.msdyn_responseFormat,
    };

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
    const data = await response.json();
    return msdyn_SalesMeetingPreparationResponse.fromResponse(data);
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
