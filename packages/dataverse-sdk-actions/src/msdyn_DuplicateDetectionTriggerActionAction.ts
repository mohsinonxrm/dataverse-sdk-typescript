import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DuplicateDetectionTriggerAction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_DuplicateDetectionTriggerActionResponse = void;

/**
 * Parameters of the msdyn_DuplicateDetectionTriggerAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DuplicateDetectionTriggerActionActionParameters {
  BaseRecordType?: string;
  BaseRecordId?: string;
}

/**
 * msdyn_DuplicateDetectionTriggerAction action
 *
 * Unbound action
 */
export class msdyn_DuplicateDetectionTriggerActionAction implements Executable<msdyn_DuplicateDetectionTriggerActionResponse> {
  constructor(
    public readonly parameters: msdyn_DuplicateDetectionTriggerActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DuplicateDetectionTriggerAction`;

    const body = requestBody({
      BaseRecordType: this.parameters.BaseRecordType,
      BaseRecordId: this.parameters.BaseRecordId,
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

  parseResponse(_response: Response): Promise<msdyn_DuplicateDetectionTriggerActionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
