import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrieveKnowledgeSearchModifiers message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKnowledgeSearchModifiersRequestParameters {
  RuntimeMode?: string;
}

/**
 * msdyn_RetrieveKnowledgeSearchModifiers request message
 *
 * Web API Action: msdyn_RetrieveKnowledgeSearchModifiers
 */
export class msdyn_RetrieveKnowledgeSearchModifiersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKnowledgeSearchModifiersResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKnowledgeSearchModifiersRequestParameters>;

  constructor(parameters: msdyn_RetrieveKnowledgeSearchModifiersRequestParameters = {}) {
    super("msdyn_RetrieveKnowledgeSearchModifiers", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSearchModifiers`;

    const body = requestBody({
      RuntimeMode: this.Parameters.RuntimeMode,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSearchModifiersResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveKnowledgeSearchModifiersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveKnowledgeSearchModifiers action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKnowledgeSearchModifiersResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RetrieveKnowledgeSearchModifiers response message
 *
 * `result` is the value the msdyn_RetrieveKnowledgeSearchModifiers action returns (see {@link msdyn_RetrieveKnowledgeSearchModifiersResult}).
 */
export class msdyn_RetrieveKnowledgeSearchModifiersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeSearchModifiersResult) {
    super("msdyn_RetrieveKnowledgeSearchModifiers");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeSearchModifiersResponse {
    return new msdyn_RetrieveKnowledgeSearchModifiersResponse(
      data as msdyn_RetrieveKnowledgeSearchModifiersResult
    );
  }
}
