import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the AddToFeedbackLoop message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddToFeedbackLoopRequestParameters {
  predictionInput: EntityReference | AnyEntityPayload;
  source?: string;
  inputName?: string;
  predictionOutput?: string;
}

/**
 * AddToFeedbackLoop request message
 *
 * Web API Action: AddToFeedbackLoop
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class AddToFeedbackLoopRequest
  extends OrganizationRequest
  implements Executable<AddToFeedbackLoopResponse>
{
  declare readonly Parameters: Readonly<AddToFeedbackLoopRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: AddToFeedbackLoopRequestParameters
  ) {
    super("AddToFeedbackLoop", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${odataLiteral.guid(this.msdyn_aimodelId)})/Microsoft.Dynamics.CRM.AddToFeedbackLoop`;

    const body = requestBody({
      predictionInput: this.Parameters.predictionInput,
      source: this.Parameters.source,
      inputName: this.Parameters.inputName,
      predictionOutput: this.Parameters.predictionOutput,
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

  parseResponse(_response: Response): Promise<AddToFeedbackLoopResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new AddToFeedbackLoopResponse());
  }
}

/**
 * AddToFeedbackLoop response message
 */
export class AddToFeedbackLoopResponse extends OrganizationResponse {
  constructor() {
    super("AddToFeedbackLoop");
  }

  static fromResponse(_data?: unknown): AddToFeedbackLoopResponse {
    return new AddToFeedbackLoopResponse();
  }
}
