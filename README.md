# Playwright Reto 30 Días

Proyecto de pruebas E2E con Playwright y TypeScript. Contiene pruebas de ejemplo y un test de login para OrangeHRM.

## Contenido del proyecto

- `package.json` - dependencias del proyecto
- `playwright.config.ts` - configuración de Playwright
- `tests/` - pruebas E2E (`tests/example.spec.ts`, `tests/training.spec.ts`, `tests/login.spec.ts`, `tests/users.spec.ts`)
- `playwright-report/` - reporte HTML generado por Playwright
- `test-results/` - resultados de ejecución

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

Instala dependencias y los navegadores de Playwright:

```bash
npm install
npx playwright install
```

## Ejecutar pruebas

Ejecuta todas las pruebas en `tests/`:

```bash
npx playwright test
```

Ejecutar un archivo de prueba específico:

```bash
npx playwright test tests/login.spec.ts
```

Ejecutar por nombre de test y en un proyecto concreto:

```bash
npx playwright test --grep "login" --project=chromium --headed
```

Mostrar reporte HTML:

```bash
npx playwright show-report
```

## Configuración actual

- `testDir: './tests'`
- `fullyParallel: true`
- `reporter: 'html'`
- Proyectos: `chromium`, `firefox`, `webkit`
- `trace: 'on-first-retry'`
- `slowMo: 1000` en `launchOptions`

## Notas sobre los tests

- `tests/example.spec.ts`: pruebas de ejemplo contra playwright.dev
- `tests/training.spec.ts`: test de login para https://www.saucedemo.com/ (valida el título `Products`)
- `tests/login.spec.ts`: login a https://opensource-demo.orangehrmlive.com con credenciales válidas e inválidas, y validación de mensajes de error
- `tests/users.spec.ts`: 
  - "Get all usernames registered in HRM": extrae todos los nombres de usuario del sistema de gestión de usuarios de OrangeHRM
  - "Get all employees names registered in HRM": extrae todos los nombres de empleados registrados en OrangeHRM

## Scripts sugeridos

Puedes añadir los siguientes scripts a `package.json` para simplificar comandos:

```json
"scripts": {
  "test": "playwright test",
  "test:headed": "playwright test --headed",
  "report": "playwright show-report"
}
```

## Recursos

- Documentación Playwright: https://playwright.dev
- Guía TypeScript: https://www.typescriptlang.org
