import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PowerAutomateLogger action
 */
export interface msdyn_PowerAutomateLoggerResponse {
  Success: boolean;
}

/**
 * msdyn_PowerAutomateLogger action
 *
 * Unbound action
 */
export class msdyn_PowerAutomateLoggerAction implements Executable<msdyn_PowerAutomateLoggerResponse> {
  constructor(
    public readonly logType: string,
    public readonly logMessage: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PowerAutomateLogger`;

    const body: Record<string, unknown> = {
      LogType: this.logType,
      LogMessage: this.logMessage,
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

  async parseResponse(response: Response): Promise<msdyn_PowerAutomateLoggerResponse> {
    const data = await response.json();
    return data as msdyn_PowerAutomateLoggerResponse;
  }
}
