import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SaveSettingValue action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type SaveSettingValueResponse = void;

/**
 * Parameters of the SaveSettingValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SaveSettingValueActionParameters {
  AppUniqueName?: string;
  SettingName: string;
  Value: string;
  SolutionUniqueName?: string;
}

/**
 * SaveSettingValue action
 *
 * Unbound action
 */
export class SaveSettingValueAction implements Executable<SaveSettingValueResponse> {
  constructor(public readonly parameters: SaveSettingValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SaveSettingValue`;

    const body = requestBody({
      AppUniqueName: this.parameters.AppUniqueName,
      SettingName: this.parameters.SettingName,
      Value: this.parameters.Value,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
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

  parseResponse(_response: Response): Promise<SaveSettingValueResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
