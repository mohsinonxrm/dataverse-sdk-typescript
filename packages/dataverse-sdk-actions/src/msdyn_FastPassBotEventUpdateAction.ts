import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_FastPassBotEventUpdate action
 */
export interface msdyn_FastPassBotEventUpdateResponse {
  // No content returned
}

/**
 * msdyn_FastPassBotEventUpdate action
 *
 * Unbound action
 */
export class msdyn_FastPassBotEventUpdateAction implements Executable<msdyn_FastPassBotEventUpdateResponse> {
  constructor(
    public readonly msdyn_PreImageRecord: EntityReference | AnyEntityPayload,
    public readonly msdyn_PostImageRecord: EntityReference | AnyEntityPayload
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FastPassBotEventUpdate`;

    const body: Record<string, unknown> = {
      msdyn_PreImageRecord: this.msdyn_PreImageRecord,
      msdyn_PostImageRecord: this.msdyn_PostImageRecord,
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

  async parseResponse(response: Response): Promise<msdyn_FastPassBotEventUpdateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
