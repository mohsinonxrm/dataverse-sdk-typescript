import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_GetAutonomousDraftContent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAutonomousDraftContentResponse {
  "@odata.context"?: string;
  Body: string;
  Subject: string;
  usage: string;
}

/**
 * Parameters of the msdyn_GetAutonomousDraftContent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAutonomousDraftContentActionParameters {
  Caller?: string;
  LanguageLocale?: string;
  SuggestionResponse: string;
  Context?: string;
  AgentName?: string;
  CustomerName?: string;
  IntentFamilyId?: string;
  SuggestionSubtype: string;
  TemplateParameters?: string;
  Entity?: EntityReference | AnyEntityPayload;
  ubbHeaders?: string;
}

/**
 * msdyn_GetAutonomousDraftContent action
 *
 * Unbound action
 */
export class msdyn_GetAutonomousDraftContentAction implements Executable<msdyn_GetAutonomousDraftContentResponse> {
  constructor(public readonly parameters: msdyn_GetAutonomousDraftContentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutonomousDraftContent`;

    const body = requestBody({
      Caller: this.parameters.Caller,
      LanguageLocale: this.parameters.LanguageLocale,
      SuggestionResponse: this.parameters.SuggestionResponse,
      Context: this.parameters.Context,
      AgentName: this.parameters.AgentName,
      CustomerName: this.parameters.CustomerName,
      IntentFamilyId: this.parameters.IntentFamilyId,
      SuggestionSubtype: this.parameters.SuggestionSubtype,
      TemplateParameters: this.parameters.TemplateParameters,
      Entity: this.parameters.Entity,
      ubbHeaders: this.parameters.ubbHeaders,
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

  async parseResponse(response: Response): Promise<msdyn_GetAutonomousDraftContentResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAutonomousDraftContentResponse;
  }
}
