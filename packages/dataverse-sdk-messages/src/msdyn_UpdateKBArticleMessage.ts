import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateKBArticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateKBArticleRequestParameters {
  DoesKBExistResponse3: string;
  CSCopilotRequest3: string;
}

/**
 * msdyn_UpdateKBArticle request message
 *
 * Web API Action: msdyn_UpdateKBArticle
 */
export class msdyn_UpdateKBArticleRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateKBArticleResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateKBArticleRequestParameters>;

  constructor(parameters: msdyn_UpdateKBArticleRequestParameters) {
    super("msdyn_UpdateKBArticle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateKBArticle`;

    const body = requestBody({
      DoesKBExistResponse3: this.Parameters.DoesKBExistResponse3,
      CSCopilotRequest3: this.Parameters.CSCopilotRequest3,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateKBArticleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateKBArticleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateKBArticle action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateKBArticleResult {
  "@odata.context"?: string;
  Response3: string;
  usage: string;
}

/**
 * msdyn_UpdateKBArticle response message
 *
 * `result` is the value the msdyn_UpdateKBArticle action returns (see {@link msdyn_UpdateKBArticleResult}).
 */
export class msdyn_UpdateKBArticleResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateKBArticleResult) {
    super("msdyn_UpdateKBArticle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateKBArticleResponse {
    return new msdyn_UpdateKBArticleResponse(data as msdyn_UpdateKBArticleResult);
  }
}
