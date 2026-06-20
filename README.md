# Playwright Reto 30 Días

Proyecto de pruebas E2E con Playwright y TypeScript. Incluye casos de prueba para OrangeHRM y SauceDemo, junto con page objects reutilizables.

## Estructura del proyecto

- `package.json` - dependencias del proyecto
- `playwright.config.ts` - configuración de Playwright
- `components/SidePanel.ts` - page object para el menú lateral de OrangeHRM
- `pageobjests/LoginPage.ts` - page object para el login de OrangeHRM
- `tests/` - pruebas E2E
- `playwright-report/` - reporte HTML generado por Playwright
- `test-results/` - resultados de ejecución

## Cambios recientes

- `tests/navegation.spec.ts` ahora recorre los elementos del panel izquierdo de OrangeHRM, valida la lista completa de opciones y navega entre ellas.
- Se añadieron verificaciones de las subopciones de `Qualifications` y `Configuration` dentro del menú `Admin`.
- `tests/users.spec.ts` extrae nombres de usuario y nombres de empleados, y selecciona un usuario distinto de `Admin` para validar el formulario de edición.
- Se centralizó el login en el page object `LoginPage` para mejorar la reutilización en varias pruebas.
- Se añadió el componente `SidePanel` para manejar visibilidad, selección y filtrado de opciones del menú lateral.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

Instala dependencias y los navegadores de Playwright:

```bash
npm install
npx playwright install
```

## Ejecución de pruebas

Ejecuta todas las pruebas definidas en `tests/`:

```bash
npx playwright test
```

Ejecutar un archivo de prueba específico:

```bash
npx playwright test tests/login.spec.ts
```

Ejecuta pruebas filtradas por nombre en Chromium de forma visible:

```bash
npx playwright test --grep "login" --project=chromium --headed
```

Muestra el reporte generado:

```bash
npx playwright show-report
```

## Configuración actual de Playwright

- `testDir: './tests'`
- `fullyParallel: true`
- `forbidOnly` habilitado en CI
- `retries: 2` en CI, `0` localmente
- `workers: 1` en CI, indefinido localmente
- `reporter: 'html'`
- `use.baseURL: 'https://opensource-demo.orangehrmlive.com'`
- `use.trace: 'on-first-retry'`
- `use.launchOptions.slowMo: 1000`
- Proyectos configurados: `chromium`, `firefox`, `webkit`

## Pruebas disponibles

- `tests/example.spec.ts`
  - Verifica el título de `https://playwright.dev/`
  - Navega al enlace "Get started" y valida que aparezca el encabezado de instalación

- `tests/training.spec.ts`
  - Inicia sesión en `https://www.saucedemo.com/`
  - Valida que la página muestre el título `Products`

- `tests/login.spec.ts`
  - Login válido en OrangeHRM con `Admin` / `admin123`
  - Login inválido con contraseña incorrecta y validación del mensaje `Invalid credentials`

- `tests/navegation.spec.ts`
  - Login en OrangeHRM con `Admin` / `admin123` usando el page object `LoginPage`
  - Valida que la URL sea del dashboard y que el enlace `Admin` esté visible
  - Comprueba la lista completa del menú lateral y que coincide con los elementos esperados
  - Recorre cada opción del panel izquierdo y vuelve atrás tras seleccionar `Maintenance`
  - Valida las opciones de `Qualifications` dentro del menú `Admin` y sus rutas
  - Valida las opciones de `Configuration` dentro del menú `Admin` y sus rutas
  - Usa el componente `SidePanel` para controlar visibilidad y selección de opciones

- `tests/users.spec.ts`
  - Login en OrangeHRM con `Admin` / `admin123` usando el page object `LoginPage`
  - Navega a `Admin > User Management > Users`
  - Extrae todos los nombres de usuario registrados en la tabla
  - Extrae todos los nombres de empleados registrados en la tabla
  - Selecciona un usuario aleatorio distinto de `Admin` y valida que el formulario de edición muestra su nombre correctamente

## Scripts sugeridos

Actualmente `package.json` no define scripts. Puedes agregar los siguientes para simplificar el uso:

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
