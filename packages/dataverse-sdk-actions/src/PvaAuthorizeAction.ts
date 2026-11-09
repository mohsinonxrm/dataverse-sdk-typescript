import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the PvaAuthorize action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type PvaAuthorizeResponse = void;

/**
 * Parameters of the PvaAuthorize action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaAuthorizeActionParameters {
  Users: Record<string, unknown>[];
  SharingRoleType: number;
  ShareOrUnshare: boolean;
}

/**
 * PvaAuthorize action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaAuthorizeAction implements Executable<PvaAuthorizeResponse> {
  constructor(
    public readonly botId: string,
    public readonly parameters: PvaAuthorizeActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${odataLiteral.guid(this.botId)})/Microsoft.Dynamics.CRM.PvaAuthorize`;

    const body = requestBody({
      Users: this.parameters.Users,
      SharingRoleType: this.parameters.SharingRoleType,
      ShareOrUnshare: this.parameters.ShareOrUnshare,
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

  parseResponse(_response: Response): Promise<PvaAuthorizeResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
