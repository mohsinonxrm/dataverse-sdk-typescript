import * as ejs from "ejs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { SchemaModel } from "./schema-model.js";
import type { DataverseGenConfig } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generates TypeScript code from schema model
 */
export class TypescriptGenerator {
  private outputRoot: string;
  private fileSuffix: string;

  constructor(
    private model: SchemaModel,
    private config: DataverseGenConfig
  ) {
    this.outputRoot = config.output?.outputRoot ?? "./generated";
    this.fileSuffix = config.output?.fileSuffix ?? "";
  }

  /**
   * Generate all TypeScript files
   */
  async generate(): Promise<void> {
    await this.outputEntities();
    await this.outputEnums();
    await this.outputActions();
    await this.outputFunctions();
    await this.outputComplexTypes();
    await this.outputMetadata();

    if (this.config.output?.generateIndex !== false) {
      await this.outputIndexFiles();
    }
  }

  /**
   * Generate entity interfaces
   */
  private async outputEntities(): Promise<void> {
    const dir = path.join(this.outputRoot, "entities");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("entity.ejs");

    for (const entity of this.model.EntityTypes) {
      const fileName = `${entity.Name}${this.fileSuffix}.ts`;
      const filePath = path.join(dir, fileName);

      const output = ejs.render(template, {
        entity,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatType: (type: any) => this.formatTypeScriptType(type),
        getSourceTypeComment: (sourceType?: number) => this.getSourceTypeComment(sourceType),
      });

      await fs.writeFile(filePath, output, "utf-8");
    }
  }

  /**
   * Generate enum types
   */
  private async outputEnums(): Promise<void> {
    const dir = path.join(this.outputRoot, "enums");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("enum.ejs");

    for (const enumType of this.model.EnumTypes) {
      const fileName = `${enumType.Name}${this.fileSuffix}.ts`;
      const filePath = path.join(dir, fileName);

      const output = ejs.render(template, { enum: enumType });

      await fs.writeFile(filePath, output, "utf-8");
    }
  }

  /**
   * Generate action classes
   */
  private async outputActions(): Promise<void> {
    const dir = path.join(this.outputRoot, "actions");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("action.ejs");

    for (const action of this.model.Actions) {
      const fileName = `${action.Name}Action${this.fileSuffix}.ts`;
      const filePath = path.join(dir, fileName);

      const output = ejs.render(template, {
        action,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatType: (type: any) => this.formatTypeScriptType(type),
        getStructuralType: (type: string) => this.model.getStructuralType(type),
      });

      await fs.writeFile(filePath, output, "utf-8");
    }
  }

  /**
   * Generate function classes
   */
  private async outputFunctions(): Promise<void> {
    const dir = path.join(this.outputRoot, "functions");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("function.ejs");

    for (const func of this.model.Functions) {
      const fileName = `${func.Name}Function${this.fileSuffix}.ts`;
      const filePath = path.join(dir, fileName);

      const output = ejs.render(template, {
        func,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatType: (type: any) => this.formatTypeScriptType(type),
        getStructuralType: (type: string) => this.model.getStructuralType(type),
      });

      await fs.writeFile(filePath, output, "utf-8");
    }
  }

  /**
   * Generate complex type interfaces
   */
  private async outputComplexTypes(): Promise<void> {
    const dir = path.join(this.outputRoot, "complextypes");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("complextype.ejs");

    for (const complexType of this.model.ComplexTypes) {
      const fileName = `${complexType.Name}${this.fileSuffix}.ts`;
      const filePath = path.join(dir, fileName);

      const output = ejs.render(template, {
        complexType,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatType: (type: any) => this.formatTypeScriptType(type),
      });

      await fs.writeFile(filePath, output, "utf-8");
    }
  }

  /**
   * Generate metadata cache file
   */
  private async outputMetadata(): Promise<void> {
    const filePath = path.join(this.outputRoot, `metadata${this.fileSuffix}.ts`);
    const template = await this.loadTemplate("metadata.ejs");

    const output = ejs.render(template, {
      entities: this.model.EntityTypes,
      actions: this.model.Actions,
      functions: this.model.Functions,
    });

    await fs.writeFile(filePath, output, "utf-8");
  }

  /**
   * Generate index barrel exports
   */
  private async outputIndexFiles(): Promise<void> {
    // Root index
    const rootIndexPath = path.join(this.outputRoot, "index.ts");
    const rootIndexContent = `export * from './entities/index.js';
export * from './enums/index.js';
export * from './actions/index.js';
export * from './functions/index.js';
export * from './complextypes/index.js';
export * from './metadata.js';
`;
    await fs.writeFile(rootIndexPath, rootIndexContent, "utf-8");

    // Entities index
    await this.outputFolderIndex(
      "entities",
      this.model.EntityTypes.map((e) => e.Name)
    );

    // Enums index
    await this.outputFolderIndex(
      "enums",
      this.model.EnumTypes.map((e) => e.Name)
    );

    // Actions index
    await this.outputFolderIndex(
      "actions",
      this.model.Actions.map((a) => `${a.Name}Action`)
    );

    // Functions index
    await this.outputFolderIndex(
      "functions",
      this.model.Functions.map((f) => `${f.Name}Function`)
    );

    // Complex types index
    await this.outputFolderIndex(
      "complextypes",
      this.model.ComplexTypes.map((c) => c.Name)
    );
  }

  /**
   * Generate index file for a folder
   */
  private async outputFolderIndex(folder: string, names: string[]): Promise<void> {
    const dir = path.join(this.outputRoot, folder);
    const indexPath = path.join(dir, "index.ts");

    const exports = names
      .map((name) => `export * from './${name}${this.fileSuffix}.js';`)
      .join("\n");

    await fs.writeFile(indexPath, exports + "\n", "utf-8");
  }

  /**
   * Load EJS template
   */
  private async loadTemplate(name: string): Promise<string> {
    const templatePath = path.join(__dirname, "../templates", name);
    return await fs.readFile(templatePath, "utf-8");
  }

  /**
   * Format TypeScript type for output
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatTypeScriptType(type: any): string {
    if (!type) return "void";

    const baseType = type.name ?? "any";
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return type.isArray ? `${baseType}[]` : baseType;
  }

  /**
   * Get source type comment for calculated/rollup fields
   */
  private getSourceTypeComment(sourceType?: number): string {
    if (sourceType === 1) return " // Calculated";
    if (sourceType === 2) return " // Rollup";
    return "";
  }
}
