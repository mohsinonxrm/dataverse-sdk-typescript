import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesDataQualityAgent_ActivateResponse as msdyn_SalesDataQualityAgent_ActivateResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_Activate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ActivateRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_Activate request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_Activate
 */
export class msdyn_SalesDataQualityAgent_ActivateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_ActivateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_ActivateRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_ActivateRequestParameters) {
    super("msdyn_SalesDataQualityAgent_Activate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_Activate`;

    const body = requestBody({
      RequestJson: this.Parameters.RequestJson,
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

  async parseResponse(response: Response): Promise<msdyn_SalesDataQualityAgent_ActivateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_ActivateResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_ActivateResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesDataQualityAgent_Activate response message
 */
export class msdyn_SalesDataQualityAgent_ActivateResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ActivateResponseData) {
    super("msdyn_SalesDataQualityAgent_Activate");
  }

  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_ActivateResponse {
    return new msdyn_SalesDataQualityAgent_ActivateResponse(
      responseObject<msdyn_SalesDataQualityAgent_ActivateResponseData>(data)
    );
  }
}
