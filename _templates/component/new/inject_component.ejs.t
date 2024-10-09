---
to: src/libs/common/components/ui/<%= directory %>/index.ts
inject: true
append: true
---
export * from './<%= h.changeCase.kebabCase(name) %>';