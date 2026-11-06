import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_EvaluateConversationResponse as msdyn_EvaluateConversationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_EvaluateConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EvaluateConversationRequestParameters {
  AllowCrossGeo?: boolean;
  ConversationPayload?: string;
  CriteriaId: string;
  LangLocale?: string;
  EvaluationId: string;
  ExtendedContext?: string;
  RecordId?: string;
}

/**
 * msdyn_EvaluateConversation request message
 *
 * Web API Action: msdyn_EvaluateConversation
 */
export class msdyn_EvaluateConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_EvaluateConversationResponse>
{
  declare readonly Parameters: Readonly<msdyn_EvaluateConversationRequestParameters>;

  constructor(parameters: msdyn_EvaluateConversationRequestParameters) {
    super("msdyn_EvaluateConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EvaluateConversation`;

    const body = requestBody({
      AllowCrossGeo: this.Parameters.AllowCrossGeo,
      ConversationPayload: this.Parameters.ConversationPayload,
      CriteriaId: this.Parameters.CriteriaId,
      LangLocale: this.Parameters.LangLocale,
      EvaluationId: this.Parameters.EvaluationId,
      ExtendedContext: this.Parameters.ExtendedContext,
      RecordId: this.Parameters.RecordId,
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

  async parseResponse(response: Response): Promise<msdyn_EvaluateConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_EvaluateConversationResponse.fromResponse({});
    return msdyn_EvaluateConversationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_EvaluateConversation response message
 */
export class msdyn_EvaluateConversationResponse extends OrganizationResponse {
  constructor(public result: msdyn_EvaluateConversationResponseData) {
    super("msdyn_EvaluateConversation");
  }

  static fromResponse(data: unknown): msdyn_EvaluateConversationResponse {
    return new msdyn_EvaluateConversationResponse(
      responseObject<msdyn_EvaluateConversationResponseData>(data)
    );
  }
}
