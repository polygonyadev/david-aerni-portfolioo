import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({ name: "default", title: "David Aerni Portfolio", projectId: "wqg64dj7", dataset: "production", plugins: [structureTool()], schema: { types: schemaTypes } });
