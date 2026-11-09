import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_PowerAutomateLogger action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PowerAutomateLoggerResponse {
  "@odata.context"?: string;
  Success: boolean;
}

/**
 * Parameters of the msdyn_PowerAutomateLogger action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PowerAutomateLoggerActionParameters {
  LogMessage: string;
  LogType: string;
}

/**
 * msdyn_PowerAutomateLogger action
 *
 * Unbound action
 */
export class msdyn_PowerAutomateLoggerAction implements Executable<msdyn_PowerAutomateLoggerResponse> {
  constructor(public readonly parameters: msdyn_PowerAutomateLoggerActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PowerAutomateLogger`;

    const body = requestBody({
      LogMessage: this.parameters.LogMessage,
      LogType: this.parameters.LogType,
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

  async parseResponse(response: Response): Promise<msdyn_PowerAutomateLoggerResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_PowerAutomateLoggerResponse;
  }
}
