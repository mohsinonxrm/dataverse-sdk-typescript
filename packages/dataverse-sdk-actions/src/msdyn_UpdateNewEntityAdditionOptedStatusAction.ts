import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateNewEntityAdditionOptedStatus action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateNewEntityAdditionOptedStatusResponse = void;

/**
 * Parameters of the msdyn_UpdateNewEntityAdditionOptedStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateNewEntityAdditionOptedStatusActionParameters {
  PredictionName: string;
  PredictionType: string;
  IsNewEntityAdditionOpted: boolean;
}

/**
 * msdyn_UpdateNewEntityAdditionOptedStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateNewEntityAdditionOptedStatusAction implements Executable<msdyn_UpdateNewEntityAdditionOptedStatusResponse> {
  constructor(
    public readonly parameters: msdyn_UpdateNewEntityAdditionOptedStatusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateNewEntityAdditionOptedStatus`;

    const body = requestBody({
      PredictionName: this.parameters.PredictionName,
      PredictionType: this.parameters.PredictionType,
      IsNewEntityAdditionOpted: this.parameters.IsNewEntityAdditionOpted,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateNewEntityAdditionOptedStatusResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
