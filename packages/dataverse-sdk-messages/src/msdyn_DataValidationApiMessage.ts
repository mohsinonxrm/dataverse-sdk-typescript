import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DataValidationApi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DataValidationApiRequestParameters {
  ApiType: number;
  ApiPayLoad?: string;
}

/**
 * msdyn_DataValidationApi request message
 *
 * Web API Action: msdyn_DataValidationApi
 */
export class msdyn_DataValidationApiRequest
  extends OrganizationRequest
  implements Executable<msdyn_DataValidationApiResponse>
{
  declare readonly Parameters: Readonly<msdyn_DataValidationApiRequestParameters>;

  constructor(parameters: msdyn_DataValidationApiRequestParameters) {
    super("msdyn_DataValidationApi", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DataValidationApi`;

    const body = requestBody({
      ApiType: this.Parameters.ApiType,
      ApiPayLoad: this.Parameters.ApiPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_DataValidationApiResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_DataValidationApiResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DataValidationApi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DataValidationApiResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_DataValidationApi response message
 *
 * `result` is the value the msdyn_DataValidationApi action returns (see {@link msdyn_DataValidationApiResult}).
 */
export class msdyn_DataValidationApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_DataValidationApiResult) {
    super("msdyn_DataValidationApi");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DataValidationApiResponse {
    return new msdyn_DataValidationApiResponse(data as msdyn_DataValidationApiResult);
  }
}
