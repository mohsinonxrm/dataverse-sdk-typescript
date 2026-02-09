import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from FormPredict action
 */
export interface FormPredictResponse {
  value: EntityReference;
}

/**
 * FormPredict action
 *
 * Unbound action
 */
export class FormPredictAction implements Executable<FormPredictResponse> {
  constructor(
    public readonly entityName: string,
    public readonly predictorFields: string[],
    public readonly context: string,
    public readonly requestedFields: string[],
    public readonly recordValues: string,
    public readonly clientPartnerSource: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<FormPredictResponse> {
    const data = await response.json();
    return data as FormPredictResponse;
  }
}
