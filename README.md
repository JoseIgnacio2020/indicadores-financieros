# mi-indicador-webapp

Single‑page AngularJS app that displays Chilean financial indicators (Dólar, Euro, UF, IPC, UTM) with list and detail views (charts).


## 🚀 Requisitos

- Node.js (v14+)
- npm

_La app es “frontend‑only” (no build step), pero servida bajo HTTP._

## ⚙️ Instalación y puesta en marcha

1. **Clonar el repo**
   ```bash
   git clone https://github.com/JoseIgnacio2020/indicadores-financieros.git
   cd mi‑indicador‑webapp

2.  **Instalar dependencias**
(solo para servir localmente; la app no compila nada)
npm install http-server --save-dev

3.  **Configurar API Key**
      Abre app/services/api-service.js.
      Ajusta var apiKey = '...' con tu clave SBIF.
      Opcional: activa o desactiva useMock si quieres probar con datos falsos (mock-data.js).

4.  **Servir la app localmente**
      npx http-server . -c-1 -o
      Abre http://localhost:8080 (o el puerto que indique la consola).
      La opción -c-1 desactiva cache; -o abre el navegador.

5.  **Navegar**
      Vista Inicio: listado estático de indicadores.
      Ver valores (ícono lista): list view con últimas 30 cotizaciones.
      Más información (ícono info): detail view con gráfico de los últimos 10 días (o 12 meses).

📝 Uso de mocks
Si la API oficial falla o quieres trabajar offline:
En api-service.js, pon:
  var useMock = true;
El código usará app/mocks/mock-data.js para poblar listas y gráficos.

🏁 Clonar y ejecutar
Cualquier persona puede clonar este repositorio y ejecutarlo localmente en 3 pasos:

1️⃣ Clonar el repositorio
git clone https://github.com/JoseIgnacio2020/indicadores-financieros.git
cd indicadores-financieros

2️⃣ Instalar dependencias (opcional)
npm install http-server --save-dev
Esto sirve para correr un servidor local y evitar problemas de CORS.

3️⃣ Servir la app localmente
npx http-server . -c-1 -o
Abre automáticamente en el navegador (-o).
Sin caché (-c-1).

🧭 Navegación de la App
  Inicio → Lista estática de indicadores.
  Ver valores → Lista de fechas y valores últimos 30 días (o año actual).
  Más información → Vista de detalle con gráfico (últimos 10 días o últimos 12 meses).
