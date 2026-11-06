import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_EvaluateConversationResponse as msdyn_EvaluateConversationResponseData } from "./types/index.js";

/**
 * msdyn_EvaluateConversation request message
 *
 * Web API Action: msdyn_EvaluateConversation
 */
export class msdyn_EvaluateConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_EvaluateConversationResponse>
{
  constructor(
    public criteriaId: string,
    public extendedContext: string,
    public conversationPayload: string,
    public langLocale: string,
    public evaluationId: string,
    public allowCrossGeo: boolean,
    public recordId: string
  ) {
    super("msdyn_EvaluateConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EvaluateConversation`;

    const body: Record<string, unknown> = {
      CriteriaId: this.criteriaId,
      ExtendedContext: this.extendedContext,
      ConversationPayload: this.conversationPayload,
      LangLocale: this.langLocale,
      EvaluationId: this.evaluationId,
      AllowCrossGeo: this.allowCrossGeo,
      RecordId: this.recordId,
    };

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
    const data = await response.json();
    return msdyn_EvaluateConversationResponse.fromResponse(data);
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
