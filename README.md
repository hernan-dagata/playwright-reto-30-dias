# Playwright Reto 30 Días

Proyecto de pruebas E2E desarrolladas con Playwright y TypeScript.

## Descripción

Este repositorio contiene una configuración básica de Playwright con TypeScript y un ejemplo de prueba en `tests/example.spec.ts`.

## Contenido del proyecto

- `package.json` - dependencias del proyecto
- `playwright.config.ts` - configuración de Playwright
- `tests/example.spec.ts` - pruebas de ejemplo
- `playwright-report/` - reporte HTML generado por Playwright
- `test-results/` - resultados de ejecución

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecutar pruebas

Ejecuta todas las pruebas definidas en `tests/`:

```bash
npx playwright test
```

Ejecutar una prueba específica:

```bash
npx playwright test tests/example.spec.ts
```

Ejecutar un escenario específico:

```bash
npx playwright test --grep "login sauce demo" --project="chromium" --headed
```

Ver el reporte HTML generado:

```bash
npx playwright show-report
```

## Configuración actual

- `testDir: './tests'`
- `fullyParallel: true`
- `reporter: 'html'`
- Proyectos configurados para `chromium`, `firefox` y `webkit`
- `trace: 'on-first-retry'`

## Ejemplo de prueba

El archivo `tests/example.spec.ts` contiene dos casos básicos:

1. Verificar el título de la página de Playwright
2. Hacer clic en el enlace "Get started" y validar que aparece el encabezado de instalación

## Notas

Actualmente `package.json` no define scripts personalizados, por lo que se recomienda usar `npx playwright test` para ejecutar las pruebas.

## Recursos

- Documentación Playwright: https://playwright.dev
- Guía TypeScript: https://www.typescriptlang.org
