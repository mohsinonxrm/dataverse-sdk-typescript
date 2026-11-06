import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateCopilotRecordUpdateEventResponse as msdyn_CreateCopilotRecordUpdateEventResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateCopilotRecordUpdateEvent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateCopilotRecordUpdateEventRequestParameters {
  InteractionForId: string;
  InteractionContext: string;
  InteractionForLogicalName: string;
}

/**
 * msdyn_CreateCopilotRecordUpdateEvent request message
 *
 * Web API Action: msdyn_CreateCopilotRecordUpdateEvent
 */
export class msdyn_CreateCopilotRecordUpdateEventRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateCopilotRecordUpdateEventResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateCopilotRecordUpdateEventRequestParameters>;

  constructor(parameters: msdyn_CreateCopilotRecordUpdateEventRequestParameters) {
    super("msdyn_CreateCopilotRecordUpdateEvent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateCopilotRecordUpdateEvent`;

    const body = requestBody({
      InteractionForId: this.Parameters.InteractionForId,
      InteractionContext: this.Parameters.InteractionContext,
      InteractionForLogicalName: this.Parameters.InteractionForLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_CreateCopilotRecordUpdateEventResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CreateCopilotRecordUpdateEventResponse.fromResponse({});
    return msdyn_CreateCopilotRecordUpdateEventResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateCopilotRecordUpdateEvent response message
 */
export class msdyn_CreateCopilotRecordUpdateEventResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateCopilotRecordUpdateEventResponseData) {
    super("msdyn_CreateCopilotRecordUpdateEvent");
  }

  static fromResponse(data: unknown): msdyn_CreateCopilotRecordUpdateEventResponse {
    return new msdyn_CreateCopilotRecordUpdateEventResponse(
      responseObject<msdyn_CreateCopilotRecordUpdateEventResponseData>(data)
    );
  }
}
