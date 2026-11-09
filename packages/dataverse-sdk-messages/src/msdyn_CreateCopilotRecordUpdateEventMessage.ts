import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CreateCopilotRecordUpdateEventResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateCopilotRecordUpdateEvent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateCopilotRecordUpdateEventResult {
  "@odata.context"?: string;
  CopilotEventRecordGuid: string;
  RecordCreatedSuccessfully: boolean;
}

/**
 * msdyn_CreateCopilotRecordUpdateEvent response message
 *
 * `result` is the value the msdyn_CreateCopilotRecordUpdateEvent action returns (see {@link msdyn_CreateCopilotRecordUpdateEventResult}).
 */
export class msdyn_CreateCopilotRecordUpdateEventResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateCopilotRecordUpdateEventResult) {
    super("msdyn_CreateCopilotRecordUpdateEvent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateCopilotRecordUpdateEventResponse {
    return new msdyn_CreateCopilotRecordUpdateEventResponse(
      data as msdyn_CreateCopilotRecordUpdateEventResult
    );
  }
}
