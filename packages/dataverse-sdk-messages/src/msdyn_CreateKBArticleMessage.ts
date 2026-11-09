import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateKBArticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateKBArticleRequestParameters {
  CSCopilotRequest2: string;
}

/**
 * msdyn_CreateKBArticle request message
 *
 * Web API Action: msdyn_CreateKBArticle
 */
export class msdyn_CreateKBArticleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateKBArticleResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateKBArticleRequestParameters>;

  constructor(parameters: msdyn_CreateKBArticleRequestParameters) {
    super("msdyn_CreateKBArticle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateKBArticle`;

    const body = requestBody({
      CSCopilotRequest2: this.Parameters.CSCopilotRequest2,
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

  async parseResponse(response: Response): Promise<msdyn_CreateKBArticleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateKBArticleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateKBArticle action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateKBArticleResult {
  "@odata.context"?: string;
  Response2: string;
  usage: string;
}

/**
 * msdyn_CreateKBArticle response message
 *
 * `result` is the value the msdyn_CreateKBArticle action returns (see {@link msdyn_CreateKBArticleResult}).
 */
export class msdyn_CreateKBArticleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateKBArticleResult) {
    super("msdyn_CreateKBArticle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateKBArticleResponse {
    return new msdyn_CreateKBArticleResponse(data as msdyn_CreateKBArticleResult);
  }
}
