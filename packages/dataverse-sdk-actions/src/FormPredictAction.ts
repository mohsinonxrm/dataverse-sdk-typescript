import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the FormPredict action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type FormPredictResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Parameters of the FormPredict action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FormPredictActionParameters {
  requestedFields: string[];
  predictorFields: string[];
  recordValues: string;
  clientPartnerSource?: string;
  context?: string;
  entityName: string;
}

/**
 * FormPredict action
 *
 * Unbound action
 */
export class FormPredictAction implements Executable<FormPredictResponse> {
  constructor(public readonly parameters: FormPredictActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/FormPredict`;

    const body = requestBody({
      requestedFields: this.parameters.requestedFields,
      predictorFields: this.parameters.predictorFields,
      recordValues: this.parameters.recordValues,
      clientPartnerSource: this.parameters.clientPartnerSource,
      context: this.parameters.context,
      entityName: this.parameters.entityName,
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

  async parseResponse(response: Response): Promise<FormPredictResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as FormPredictResponse;
  }
}
