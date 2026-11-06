import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RecommendedEmailTemplates action
 */
export interface msdyn_RecommendedEmailTemplatesResponse {
  emailTemplates: string;
  generatedEmailString: string;
  recommendedTemplate: string;
}

/**
 * Parameters of the msdyn_RecommendedEmailTemplates action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RecommendedEmailTemplatesActionParameters {
  emailString: string;
  emailContextData?: string;
  isTemplateResponse?: boolean;
  templateFiltersInString: string;
  multiturnPayload?: string;
  emailId: string;
  copilotRequestParameters: string;
  customerIntent: string;
  filters?: string;
  transactionId: string;
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
      emailString: this.parameters.emailString,
      emailContextData: this.parameters.emailContextData,
      isTemplateResponse: this.parameters.isTemplateResponse,
      templateFiltersInString: this.parameters.templateFiltersInString,
      multiturnPayload: this.parameters.multiturnPayload,
      emailId: this.parameters.emailId,
      copilotRequestParameters: this.parameters.copilotRequestParameters,
      customerIntent: this.parameters.customerIntent,
      filters: this.parameters.filters,
      transactionId: this.parameters.transactionId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RecommendedEmailTemplatesResponse;
    return (await response.json()) as msdyn_RecommendedEmailTemplatesResponse;
  }
}
