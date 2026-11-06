import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_EmailTemplateRecommendation action
 */
export interface msdyn_EmailTemplateRecommendationResponse {
  diagnosticInfo: string;
  emailTemplates: string;
  recommendedTemplate: string;
  generatedEmailString: string;
}

/**
 * Parameters of the msdyn_EmailTemplateRecommendation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailTemplateRecommendationActionParameters {
  Headers?: number;
  customerIntent: string;
  filters?: string;
  templateFiltersInString: string;
  emailString: string;
  isTemplateResponse?: boolean;
  transactionId: string;
  multiturnPayload?: string;
  emailContextData?: string;
  copilotRequestParameters: string;
  emailId: string;
  entityReference?: EntityReference | AnyEntityPayload;
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
      templateFiltersInString: this.parameters.templateFiltersInString,
      emailString: this.parameters.emailString,
      isTemplateResponse: this.parameters.isTemplateResponse,
      transactionId: this.parameters.transactionId,
      multiturnPayload: this.parameters.multiturnPayload,
      emailContextData: this.parameters.emailContextData,
      copilotRequestParameters: this.parameters.copilotRequestParameters,
      emailId: this.parameters.emailId,
      entityReference: this.parameters.entityReference,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_EmailTemplateRecommendationResponse;
  }
}
