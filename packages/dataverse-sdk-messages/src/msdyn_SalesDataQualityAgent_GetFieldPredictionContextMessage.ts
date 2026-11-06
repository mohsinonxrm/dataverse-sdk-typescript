import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse as msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_GetFieldPredictionContext message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_GetFieldPredictionContextRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_GetFieldPredictionContext request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_GetFieldPredictionContext
 */
export class msdyn_SalesDataQualityAgent_GetFieldPredictionContextRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_GetFieldPredictionContextRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_GetFieldPredictionContextRequestParameters) {
    super("msdyn_SalesDataQualityAgent_GetFieldPredictionContext", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_GetFieldPredictionContext`;

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
  ): Promise<msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesDataQualityAgent_GetFieldPredictionContext response message
 */
export class msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponseData) {
    super("msdyn_SalesDataQualityAgent_GetFieldPredictionContext");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse {
    return new msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse(
      responseObject<msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponseData>(data)
    );
  }
}
