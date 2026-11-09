import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CreateNPSUserRating action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CreateNPSUserRatingResponse = void;

/**
 * Parameters of the CreateNPSUserRating action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateNPSUserRatingActionParameters {
  Score: number;
  Comment?: string;
  AppModuleId: string;
  Browser: string;
  Device: string;
}

/**
 * CreateNPSUserRating action
 *
 * Unbound action
 */
export class CreateNPSUserRatingAction implements Executable<CreateNPSUserRatingResponse> {
  constructor(public readonly parameters: CreateNPSUserRatingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateNPSUserRating`;

    const body = requestBody({
      Score: this.parameters.Score,
      Comment: this.parameters.Comment,
      AppModuleId: this.parameters.AppModuleId,
      Browser: this.parameters.Browser,
      Device: this.parameters.Device,
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

  parseResponse(_response: Response): Promise<CreateNPSUserRatingResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
