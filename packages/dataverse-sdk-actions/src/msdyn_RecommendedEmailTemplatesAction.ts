import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RecommendedEmailTemplates action
 */
export interface msdyn_RecommendedEmailTemplatesResponse {
  generatedEmailString: string;
  recommendedTemplate: string;
  emailTemplates: string;
}

/**
 * msdyn_RecommendedEmailTemplates action
 *
 * Unbound action
 */
export class msdyn_RecommendedEmailTemplatesAction implements Executable<msdyn_RecommendedEmailTemplatesResponse> {
  constructor(
    public readonly isTemplateResponse: boolean,
    public readonly emailContextData: string,
    public readonly emailId: string,
    public readonly templateFiltersInString: string,
    public readonly filters: string,
    public readonly customerIntent: string,
    public readonly transactionId: string,
    public readonly emailString: string,
    public readonly multiturnPayload: string,
    public readonly copilotRequestParameters: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RecommendedEmailTemplates`;

    const body: Record<string, unknown> = {
      isTemplateResponse: this.isTemplateResponse,
      emailContextData: this.emailContextData,
      emailId: this.emailId,
      templateFiltersInString: this.templateFiltersInString,
      filters: this.filters,
      customerIntent: this.customerIntent,
      transactionId: this.transactionId,
      emailString: this.emailString,
      multiturnPayload: this.multiturnPayload,
      copilotRequestParameters: this.copilotRequestParameters,
    };

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
    const data = await response.json();
    return data as msdyn_RecommendedEmailTemplatesResponse;
  }
}
