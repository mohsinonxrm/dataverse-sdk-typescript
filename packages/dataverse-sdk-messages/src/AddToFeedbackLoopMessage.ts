import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * AddToFeedbackLoop request message
 *
 * Web API Action: AddToFeedbackLoop
 */
export class AddToFeedbackLoopRequest
  extends OrganizationRequest
  implements Executable<AddToFeedbackLoopResponse>
{
  constructor(
    public msdyn_aimodelId: string,
    public inputName: string | undefined,
    public predictionOutput: string | undefined,
    public predictionInput: EntityReference | AnyEntityPayload
  ) {
    super("AddToFeedbackLoop");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.AddToFeedbackLoop`;

    const body: Record<string, unknown> = {
      inputName: this.inputName,
      predictionOutput: this.predictionOutput,
      predictionInput: this.predictionInput,
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

  async parseResponse(response: Response): Promise<AddToFeedbackLoopResponse> {
    // No return value (204 No Content)
    return new AddToFeedbackLoopResponse();
  }
}

/**
 * AddToFeedbackLoop response message
 */
export class AddToFeedbackLoopResponse extends OrganizationResponse {
  constructor() {
    super("AddToFeedbackLoop");
  }

  static fromResponse(_data: unknown): AddToFeedbackLoopResponse {
    return new AddToFeedbackLoopResponse();
  }
}
