# soyXtre — Certificados de Autenticidad
## Sistema estático · Sin base de datos · Sin servidor

---

## Estructura del proyecto

```
soyxtre-cert/
├── firebase.json           ← Config para Firebase Hosting (o cualquier hosting estático)
├── README.md
└── public/
    ├── index.html          ← Certificado público (el que ve el comprador)
    ├── generator.html      ← Generador LOCAL (solo tú lo abres, nunca se sube)
    └── certs/
        └── xtre-0001-sakura-2025.json   ← Un JSON por alfombra
```

---

## Flujo de trabajo

### Para cada alfombra que envíes:

1. **Abre `generator.html`** en tu navegador (doble clic, sin servidor)
2. Rellena el formulario: nombre, descripción, dimensiones, materiales, URLs de imágenes
3. Pulsa **"Generar certificado"**
4. **Descarga el `.json`** → súbelo a `/certs/` en tu hosting
5. **Descarga el QR** → imprímelo e inclúyelo con el paquete
6. ¡Listo! El comprador escanea y ve el certificado

---

## Subir imágenes (opciones gratuitas)

| Opción             | Límite gratis    | Cómo usarla                                         |
|--------------------|------------------|-----------------------------------------------------|
| **Cloudinary**     | 25 GB            | Sube imagen → botón "Copy URL" → pégala en el form |
| **Firebase Storage** | 5 GB           | Sube desde consola → copia la URL pública           |
| **Google Drive**   | 15 GB            | Sube → "Compartir" → enlace público → usar viewer  |
| **ImgBB**          | Ilimitado*       | imgbb.com → Upload → Direct link                   |

> *Para Google Drive usar: `https://drive.google.com/uc?id=FILE_ID&export=view`

---

## Despliegue

### Firebase Hosting (recomendado — gratuito)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting    # public dir → "public", SPA → NO
firebase deploy
```

### GitHub Pages (gratuito)
1. Sube la carpeta `public/` a un repositorio GitHub
2. Settings → Pages → Source: main branch / root
3. URL: `https://tuusuario.github.io/repo/cert/UUID`

### Netlify (gratuito)
1. Arrastra la carpeta `public/` a netlify.com/drop
2. Configura redirect: `/cert/*` → `/index.html` con código 200

### Cualquier hosting con Apache/Nginx
Añade un `.htaccess` (Apache):
```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^cert/(.*)$ /index.html [L]
```

---

## Formato del JSON

```json
{
  "uuid":        "xtre-0001-sakura-2025",
  "name":        "Alfombra Sakura",
  "description": "Inspirada en los cerezos en flor...",
  "dimensions":  "80 × 60 cm",
  "materials":   "Lana merino, base primaria, látex antideslizante",
  "technique":   "Tufting a pistola",
  "edition":     "Pieza única",
  "date":        "Marzo 2025",
  "images": [
    "https://url-imagen-principal.jpg",
    "https://url-proceso-1.jpg",
    "https://url-proceso-2.jpg"
  ]
}
```

La **primera imagen** es la principal (aparece en el certificado).
Las demás forman la galería del proceso de creación.

---

## Coste

**Todo gratuito** dentro de los límites de uso normal:
- Firebase Hosting: 10 GB tráfico/mes → miles de escaneos
- Firebase Hosting: 1 GB almacenamiento → cientos de JSONs

Los JSONs pesan ~1 KB cada uno. Para 1.000 alfombras: 1 MB.
