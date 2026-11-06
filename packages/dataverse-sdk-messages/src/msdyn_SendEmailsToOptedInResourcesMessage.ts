import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SendEmailsToOptedInResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendEmailsToOptedInResourcesRequestParameters {
  FromUserId: string;
  ToResourceIds: string;
}

/**
 * msdyn_SendEmailsToOptedInResources request message
 *
 * Web API Action: msdyn_SendEmailsToOptedInResources
 */
export class msdyn_SendEmailsToOptedInResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendEmailsToOptedInResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_SendEmailsToOptedInResourcesRequestParameters>;

  constructor(parameters: msdyn_SendEmailsToOptedInResourcesRequestParameters) {
    super("msdyn_SendEmailsToOptedInResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailsToOptedInResources`;

    const body = requestBody({
      FromUserId: this.Parameters.FromUserId,
      ToResourceIds: this.Parameters.ToResourceIds,
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

  async parseResponse(response: Response): Promise<msdyn_SendEmailsToOptedInResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SendEmailsToOptedInResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SendEmailsToOptedInResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SendEmailsToOptedInResourcesResult {
  "@odata.context"?: string;
  ExceptionMessage: string;
}

/**
 * msdyn_SendEmailsToOptedInResources response message
 *
 * `result` is the value the msdyn_SendEmailsToOptedInResources action returns (see {@link msdyn_SendEmailsToOptedInResourcesResult}).
 */
export class msdyn_SendEmailsToOptedInResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_SendEmailsToOptedInResourcesResult) {
    super("msdyn_SendEmailsToOptedInResources");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SendEmailsToOptedInResourcesResponse {
    return new msdyn_SendEmailsToOptedInResourcesResponse(
      data as msdyn_SendEmailsToOptedInResourcesResult
    );
  }
}
