/**
 * #318 live: waitForAsyncOperation() waits for a real system job. The job is a BulkDelete whose
 * query matches no record (accounts named after this run's unique id), so it deletes nothing.
 * The job's asyncoperation record (and the bulkdeleteoperation that cascades from it) is deleted
 * afterwards.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  AsyncOperationStatusCode,
  DataverseAsyncOperationError,
  waitForAsyncOperation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, runId } from "./env.js";

const created: string[] = [];

describe.skipIf(!live)("live: waitForAsyncOperation (#318)", () => {
  afterAll(async () => {
    const { client } = liveClient();
    for (const id of created) {
      await client
        .api(`asyncoperations(${id})`)
        .delete()
        .catch(() => undefined);
    }
  });

  it(
    "waits for a BulkDelete job that matches nothing to succeed",
    { timeout: 300_000 },
    async () => {
      const { client } = liveClient();
      const response = await client.api("BulkDelete").post<{ JobId: string }>({
        QuerySet: [
          {
            EntityName: "account",
            Criteria: {
              FilterOperator: "And",
              Conditions: [
                {
                  AttributeName: "name",
                  Operator: "Equal",
                  Values: [{ Type: "System.String", Value: `${runId}-matches-nothing` }],
                },
              ],
              Filters: [],
            },
          },
        ],
        JobName: `${runId} waitForAsyncOperation`,
        SendEmailNotification: false,
        ToRecipients: [],
        CCRecipients: [],
        RecurrencePattern: "",
        StartDateTime: new Date().toISOString(),
      });
      expect(response.JobId).toMatch(/^[0-9a-f-]{36}$/i);
      created.push(response.JobId);

      const seen: number[] = [];
      const job = await waitForAsyncOperation(client, response, {
        intervalMs: 2000,
        maxIntervalMs: 10_000,
        timeoutMs: 280_000,
        onProgress: (op) => seen.push(op.statuscode),
      });
      expect(job.asyncoperationid.toLowerCase()).toBe(response.JobId.toLowerCase());
      expect(job.statecode).toBe(3);
      expect(job.statuscode).toBe(AsyncOperationStatusCode.Succeeded);
      expect(job.name).toBe(`${runId} waitForAsyncOperation`);
      expect(job.completedon).toEqual(expect.any(String));
      expect(seen.at(-1)).toBe(AsyncOperationStatusCode.Succeeded);

      // A job that already completed: one read, at once.
      const reads: number[] = [];
      await waitForAsyncOperation(client, response.JobId, {
        onProgress: (op) => reads.push(op.statuscode),
      });
      expect(reads).toEqual([AsyncOperationStatusCode.Succeeded]);

      // A deadline that passes during the first read rejects with reason "timeout".
      const err = await waitForAsyncOperation(client, response.JobId, { timeoutMs: 1 }).catch(
        (e: unknown) => e
      );
      expect(err).toBeInstanceOf(DataverseAsyncOperationError);
      expect(err).toMatchObject({
        reason: "timeout",
        asyncOperationId: response.JobId.toLowerCase(),
      });
    }
  );
});
