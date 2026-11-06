import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_EmailTemplateRecommendation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EmailTemplateRecommendationResponse {
  "@odata.context"?: string;
  citations: string;
  diagnosticInfo: string;
  emailTemplates: string;
  generatedEmailString: string;
  recommendedTemplate: string;
}

/**
 * Parameters of the msdyn_EmailTemplateRecommendation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailTemplateRecommendationActionParameters {
  Headers?: number;
  customerIntent: string;
  filters?: string;
  transactionId: string;
  multiturnPayload?: string;
  templateId?: string;
  emailContextData?: string;
  templateFiltersInString: string;
  entityReference?: EntityReference | AnyEntityPayload;
  emailString: string;
  isTemplateResponse?: boolean;
  copilotRequestParameters: string;
  emailId: string;
}

/**
 * msdyn_EmailTemplateRecommendation action
 *
 * Unbound action
 */
export class msdyn_EmailTemplateRecommendationAction implements Executable<msdyn_EmailTemplateRecommendationResponse> {
  constructor(public readonly parameters: msdyn_EmailTemplateRecommendationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailTemplateRecommendation`;

    const body = requestBody({
      Headers: this.parameters.Headers,
      customerIntent: this.parameters.customerIntent,
      filters: this.parameters.filters,
      transactionId: this.parameters.transactionId,
      multiturnPayload: this.parameters.multiturnPayload,
      templateId: this.parameters.templateId,
      emailContextData: this.parameters.emailContextData,
      templateFiltersInString: this.parameters.templateFiltersInString,
      entityReference: this.parameters.entityReference,
      emailString: this.parameters.emailString,
      isTemplateResponse: this.parameters.isTemplateResponse,
      copilotRequestParameters: this.parameters.copilotRequestParameters,
      emailId: this.parameters.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_EmailTemplateRecommendationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_EmailTemplateRecommendationResponse;
  }
}
