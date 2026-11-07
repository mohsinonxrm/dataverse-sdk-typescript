import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_GetAutonomousDraftContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAutonomousDraftContentRequestParameters {
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
 * msdyn_GetAutonomousDraftContent request message
 *
 * Web API Action: msdyn_GetAutonomousDraftContent
 */
export class msdyn_GetAutonomousDraftContentRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAutonomousDraftContentResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAutonomousDraftContentRequestParameters>;

  constructor(parameters: msdyn_GetAutonomousDraftContentRequestParameters) {
    super("msdyn_GetAutonomousDraftContent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutonomousDraftContent`;

    const body = requestBody({
      Caller: this.Parameters.Caller,
      LanguageLocale: this.Parameters.LanguageLocale,
      SuggestionResponse: this.Parameters.SuggestionResponse,
      Context: this.Parameters.Context,
      AgentName: this.Parameters.AgentName,
      CustomerName: this.Parameters.CustomerName,
      IntentFamilyId: this.Parameters.IntentFamilyId,
      SuggestionSubtype: this.Parameters.SuggestionSubtype,
      TemplateParameters: this.Parameters.TemplateParameters,
      Entity: this.Parameters.Entity,
      ubbHeaders: this.Parameters.ubbHeaders,
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
    return msdyn_GetAutonomousDraftContentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAutonomousDraftContent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAutonomousDraftContentResult {
  "@odata.context"?: string;
  Body: string;
  Subject: string;
  usage: string;
}

/**
 * msdyn_GetAutonomousDraftContent response message
 *
 * `result` is the value the msdyn_GetAutonomousDraftContent action returns (see {@link msdyn_GetAutonomousDraftContentResult}).
 */
export class msdyn_GetAutonomousDraftContentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAutonomousDraftContentResult) {
    super("msdyn_GetAutonomousDraftContent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAutonomousDraftContentResponse {
    return new msdyn_GetAutonomousDraftContentResponse(
      data as msdyn_GetAutonomousDraftContentResult
    );
  }
}
