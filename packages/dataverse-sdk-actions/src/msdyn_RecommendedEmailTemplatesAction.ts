import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RecommendedEmailTemplates action
 */
export interface msdyn_RecommendedEmailTemplatesResponse {
  generatedEmailString: string;
  recommendedTemplate: string;
  emailTemplates: string;
}

/**
 * Parameters of the msdyn_RecommendedEmailTemplates action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RecommendedEmailTemplatesActionParameters {
  isTemplateResponse?: boolean;
  emailContextData?: string;
  emailId: string;
  templateFiltersInString: string;
  filters?: string;
  customerIntent: string;
  transactionId: string;
  emailString: string;
  multiturnPayload?: string;
  copilotRequestParameters: string;
}

/**
 * msdyn_RecommendedEmailTemplates action
 *
 * Unbound action
 */
export class msdyn_RecommendedEmailTemplatesAction implements Executable<msdyn_RecommendedEmailTemplatesResponse> {
  constructor(public readonly parameters: msdyn_RecommendedEmailTemplatesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RecommendedEmailTemplates`;

    const body = requestBody({
      isTemplateResponse: this.parameters.isTemplateResponse,
      emailContextData: this.parameters.emailContextData,
      emailId: this.parameters.emailId,
      templateFiltersInString: this.parameters.templateFiltersInString,
      filters: this.parameters.filters,
      customerIntent: this.parameters.customerIntent,
      transactionId: this.parameters.transactionId,
      emailString: this.parameters.emailString,
      multiturnPayload: this.parameters.multiturnPayload,
      copilotRequestParameters: this.parameters.copilotRequestParameters,
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

  async parseResponse(response: Response): Promise<msdyn_RecommendedEmailTemplatesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RecommendedEmailTemplatesResponse;
  }
}
