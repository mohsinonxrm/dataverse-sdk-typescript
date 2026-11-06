import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse as msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ExecutePreActivationAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ExecutePreActivationActionRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ExecutePreActivationAction request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_ExecutePreActivationAction
 */
export class msdyn_SalesDataQualityAgent_ExecutePreActivationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_ExecutePreActivationActionRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_ExecutePreActivationActionRequestParameters) {
    super("msdyn_SalesDataQualityAgent_ExecutePreActivationAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ExecutePreActivationAction`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesDataQualityAgent_ExecutePreActivationAction response message
 */
export class msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponseData) {
    super("msdyn_SalesDataQualityAgent_ExecutePreActivationAction");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse {
    return new msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse(
      responseObject<msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponseData>(data)
    );
  }
}
