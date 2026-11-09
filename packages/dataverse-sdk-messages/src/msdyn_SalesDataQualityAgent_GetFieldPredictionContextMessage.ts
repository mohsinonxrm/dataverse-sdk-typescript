import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_GetFieldPredictionContext action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_GetFieldPredictionContextResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_GetFieldPredictionContext response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_GetFieldPredictionContext action returns (see {@link msdyn_SalesDataQualityAgent_GetFieldPredictionContextResult}).
 */
export class msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_GetFieldPredictionContextResult) {
    super("msdyn_SalesDataQualityAgent_GetFieldPredictionContext");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse {
    return new msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse(
      data as msdyn_SalesDataQualityAgent_GetFieldPredictionContextResult
    );
  }
}
