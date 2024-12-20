# PROYECTO PARA AUTOMATIZAR EL ENVÍO DE ALERTAS SOBRE TIPO DE CAMBIO CON NODEJS Y PUPPETEER

## Instalación

Instalación de librerías
```bash
npm i puppeteer node-schedule nodemailer
```

## Uso
Ejecutar aplicación
```bash
npm run start
```

## Puppetter
Instalar dependencias para chrome
```bash
sudo apt-get install ca-certificates fonts-liberation libatk-bridge2.0-0t64 libatk1.0-0t64 libc6 libcairo2 libcups2t64 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc-s1 libglib2.0-0t64 libgtk-3-0t64 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```
**libasound2: NO FUNCIONA**

    Package libasound2 is a virtual package provided by:
    liboss4-salsa-asound2 4.2-build2020-1ubuntu3
    libasound2t64 1.2.11-1build2 (= 1.2.11-1build2)
    You should explicitly select one to install.

Install instead 
```bash
sudo apt-get install libasound2t64
```
Fuente: https://pptr.dev/troubleshooting#chrome-doesnt-launch-on-linux