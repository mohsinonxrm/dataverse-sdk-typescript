import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";

/**
 * FormPredict request message
 *
 * Web API Action: FormPredict
 */
export class FormPredictRequest
  extends OrganizationRequest
  implements Executable<FormPredictResponse>
{
  constructor(
    public entityName: string,
    public predictorFields: string[],
    public context: string | undefined,
    public requestedFields: string[],
    public recordValues: string,
    public clientPartnerSource?: string
  ) {
    super("FormPredict");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/FormPredict`;

    const body: Record<string, unknown> = {
      entityName: this.entityName,
      predictorFields: this.predictorFields,
      context: this.context,
      requestedFields: this.requestedFields,
      recordValues: this.recordValues,
      clientPartnerSource: this.clientPartnerSource,
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

  async parseResponse(response: Response): Promise<FormPredictResponse> {
    const data = await response.json();
    return FormPredictResponse.fromResponse(data);
  }
}

/**
 * FormPredict response message
 */
export class FormPredictResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("FormPredict");
  }

  static fromResponse(data: unknown): FormPredictResponse {
    return new FormPredictResponse(responseObject<Record<string, unknown>>(data));
  }
}
