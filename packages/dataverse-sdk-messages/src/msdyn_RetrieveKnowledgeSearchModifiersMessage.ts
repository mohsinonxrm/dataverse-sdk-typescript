import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveKnowledgeSearchModifiersResponse as msdyn_RetrieveKnowledgeSearchModifiersResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_RetrieveKnowledgeSearchModifiersResponse.fromResponse({});
    return msdyn_RetrieveKnowledgeSearchModifiersResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveKnowledgeSearchModifiers response message
 */
export class msdyn_RetrieveKnowledgeSearchModifiersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeSearchModifiersResponseData) {
    super("msdyn_RetrieveKnowledgeSearchModifiers");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeSearchModifiersResponse {
    return new msdyn_RetrieveKnowledgeSearchModifiersResponse(
      responseObject<msdyn_RetrieveKnowledgeSearchModifiersResponseData>(data)
    );
  }
}
