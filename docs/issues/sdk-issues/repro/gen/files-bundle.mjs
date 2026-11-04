// ../mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-files/src/FileColumnClient.ts
import {
	InitializeFileBlocksUploadAction,
	UploadBlockAction,
	CommitFileBlocksUploadAction,
} from "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-actions/dist/index.js";
var DEFAULT_CHUNK_SIZE = 4 * 1024 * 1024;
function normalizeGuid(guid) {
	return guid.replace(/[{}]/g, "").toLowerCase();
}
var FileColumnClient = class {
	constructor(adapter, baseUrl = "") {
		this.adapter = adapter;
		this.baseUrl = baseUrl;
	}
	/**
	 * Upload a file to a file or image column.
	 *
	 * Automatically chunks files larger than the specified chunk size.
	 *
	 * @param entitySetName - The entity set name (e.g., "accounts")
	 * @param recordId - The record ID (GUID)
	 * @param columnName - The logical name of the file/image column
	 * @param file - The file data (Blob in browser, Buffer in Node)
	 * @param fileName - The name of the file being uploaded
	 * @param options - Upload options (chunk size, progress callback)
	 */
	async upload(entitySetName, recordId, columnName, file, fileName, options) {
		const chunkSize = options?.chunkSize ?? DEFAULT_CHUNK_SIZE;
		const fileData = await this.fileToUint8Array(file);
		const totalSize = fileData.byteLength;
		const totalChunks = Math.ceil(totalSize / chunkSize);
		const blockIds = [];
		const initAction = new InitializeFileBlocksUploadAction(
			{
				"@odata.type": "Microsoft.Dynamics.CRM.EntityReference",
				logicalName: entitySetName,
				id: normalizeGuid(recordId),
			},
			fileName,
			columnName,
		);
		const initRequest = initAction.toRequestInformation(this.baseUrl);
		const initResponse = await this.adapter.send(initRequest);
		const { FileContinuationToken } = await initAction.parseResponse(initResponse);
		for (let i = 0; i < totalChunks; i++) {
			const start = i * chunkSize;
			const end = Math.min(start + chunkSize, totalSize);
			const chunk = fileData.slice(start, end);
			const blockId = this.generateBlockId(i);
			blockIds.push(blockId);
			const blockData = this.arrayBufferToBase64(chunk.buffer);
			const uploadAction = new UploadBlockAction(blockId, blockData, FileContinuationToken);
			const uploadRequest = uploadAction.toRequestInformation(this.baseUrl);
			await this.adapter.send(uploadRequest);
			if (options?.onProgress) {
				const uploaded = end;
				const percentage = Math.round((uploaded / totalSize) * 100);
				options.onProgress({
					uploaded,
					total: totalSize,
					percentage,
					chunkIndex: i,
					totalChunks,
				});
			}
		}
		const mimeType = file.type || "application/octet-stream";
		const commitAction = new CommitFileBlocksUploadAction(
			fileName,
			mimeType,
			blockIds,
			FileContinuationToken,
		);
		const commitRequest = commitAction.toRequestInformation(this.baseUrl);
		await this.adapter.send(commitRequest);
	}
	/**
	 * Download a file from a file or image column.
	 *
	 * @param entitySetName - The entity set name (e.g., "accounts")
	 * @param recordId - The record ID (GUID)
	 * @param columnName - The logical name of the file/image column
	 * @param options - Download options
	 * @returns The file data (Blob in browser, Buffer in Node)
	 */
	async download(entitySetName, recordId, columnName, _options) {
		const normalizedId = recordId.replace(/[{}]/g, "").toLowerCase();
		const url = `${this.baseUrl}/${entitySetName}(${normalizedId})/${columnName}/$value`;
		const request = {
			method: "GET",
			url,
			headers: {
				Accept: "application/octet-stream",
			},
		};
		const response = await this.adapter.send(request);
		if (!response.ok) {
			throw new Error(`Failed to download file: ${response.statusText}`);
		}
		if (typeof Blob !== "undefined") {
			return await response.blob();
		} else {
			const arrayBuffer = await response.arrayBuffer();
			return Buffer.from(arrayBuffer);
		}
	}
	/**
	 * Delete a file from a file or image column.
	 *
	 * @param entitySetName - The entity set name (e.g., "accounts")
	 * @param recordId - The record ID (GUID)
	 * @param columnName - The logical name of the file/image column
	 */
	async delete(entitySetName, recordId, columnName) {
		const normalizedId = recordId.replace(/[{}]/g, "").toLowerCase();
		const request = {
			method: "PATCH",
			url: `${this.baseUrl}/${entitySetName}(${normalizedId})`,
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				[columnName]: null,
			},
		};
		await this.adapter.send(request);
	}
	/**
	 * Generate a base64-encoded block ID from a sequential number.
	 */
	generateBlockId(index) {
		const blockIdStr = index.toString().padStart(8, "0");
		return this.stringToBase64(blockIdStr);
	}
	/**
	 * Convert string to base64 (works in both browser and Node).
	 */
	stringToBase64(str) {
		if (typeof btoa !== "undefined") {
			return btoa(str);
		} else {
			return Buffer.from(str, "utf-8").toString("base64");
		}
	}
	/**
	 * Convert ArrayBuffer to base64 string.
	 */
	arrayBufferToBase64(buffer) {
		if (typeof btoa !== "undefined") {
			const bytes = new Uint8Array(buffer);
			let binary = "";
			for (let i = 0; i < bytes.byteLength; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			return btoa(binary);
		} else {
			return Buffer.from(buffer).toString("base64");
		}
	}
	/**
	 * Convert Blob or Buffer to Uint8Array.
	 */
	async fileToUint8Array(file) {
		if (Buffer.isBuffer(file)) {
			return new Uint8Array(file);
		} else {
			const arrayBuffer = await file.arrayBuffer();
			return new Uint8Array(arrayBuffer);
		}
	}
};
export { FileColumnClient };
