import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetORReasonExplanation request message
 *
 * Web API Action: msdyn_GetORReasonExplanation
 */
export class msdyn_GetORReasonExplanationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetORReasonExplanationResponse>
{
  constructor(
    public entityType: number,
    public explanationObject: string,
    public entityId: string
  ) {
    super("msdyn_GetORReasonExplanation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetORReasonExplanation`;

    const body: Record<string, unknown> = {
      EntityType: this.entityType,
      ExplanationObject: this.explanationObject,
      EntityId: this.entityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetORReasonExplanationResponse> {
    const data = await response.json();
    return msdyn_GetORReasonExplanationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityType: this.entityType,
      ExplanationObject: this.explanationObject,
      EntityId: this.entityId,
    };
  }
}

/**
 * msdyn_GetORReasonExplanation response message
 */
export class msdyn_GetORReasonExplanationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetORReasonExplanationResponse) {
    super("msdyn_GetORReasonExplanation");
  }

  static fromResponse(data: unknown): msdyn_GetORReasonExplanationResponse {
    return new msdyn_GetORReasonExplanationResponse((data as any).value);
  }
}
