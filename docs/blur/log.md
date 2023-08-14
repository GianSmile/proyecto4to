# Hola mundo, soy yo, el backend dev de este proyecto, BLUR

## Martes 01/08/2023
- Se efectuó el cambio de roles con Gian y ahora soy oficialmente el BackEnd Developer.
- Creación del Diagrama Entidad-Relación.

## Miercoles 02/08/2023
- Ajustes al Diagrama Entidad-Relación.
- Creación del Diagrama Logico-Relacional.
- Aprendí las naming conventions de objetos en bases de datos de SQL.
- Creé la base de datos en PlanetScale.
- Hablé con Luis Embon que me dió recomendaciones sobre que tecnologías investigar para no usar PHP.
- Conseguí acceso al repo y comencé a documentar.

## Jueves 03/08/2023
- Descartación del uso de las tecnologías PostgreSQL y deno.
- Seteado de proyecto de node, express, typescript y prisma.
- Creación de modelos de prisma y migración a la base de datos.

## Lunes 07/08/2023
- Empezar a crear API con Express. Obtener usuario.
- Cambiar el esquema de la base de datos para añadir DNI y numero de matricula para los veterinarios.

## Martes 08/08/2023
- Crear endpoints GET para:
  - Mascotas por usuario.
  - Mascota por id.
  - Análisis por mascota.
  - Análisis por usuario.
  - Análisis por id.
- Comenzar a crear endpoints POST para:
  - Crear usuario.
  - Crear mascota.

## Miercoles 09/08/2023
- Dividir las partes del backend en diferentes archivos en vez de usar unicamente `index.ts` para mejor organización:
  - `index.ts`: Archivo principal, instancia de express, use y abrir puerto para escuchar requests.
  - `router.ts`: Declarar rutas de endpoints y asignarles una función de control.
  - `controller.ts`: Declarar funciones de control de requests.
- Verificar que los caracteres de usuarios y emails sean correctos usando RegExp.

## Jueves 10/08/2023
- Comenzar a investigar sobre el uso de tokens con JWT, cookies, y la librería jose.

## Lunes 14/08/2023
- Recorrido de Universidad Maimonides.
- Recorrido de veterinaria modelo WellVet.
- Reformulación del proyecto.
