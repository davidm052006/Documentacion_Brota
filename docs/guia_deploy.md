# 🚀 Guía de Arquitectura y Despliegue - Sistema Brota

El Sistema Brota está diseñado para ser desplegado bajo una arquitectura nativa de la nube (Cloud-Native) a nivel *On-Premise*. Se hará uso de **Docker** para la contenerización de los microservicios/componentes y **Kubernetes (K8s)** para la orquestación. Todo el entorno productivo estará alojado en el **Datacenter del SENA, sede del CGMLTI**.

---

## 🏗️ Diagrama UML de Despliegue

El siguiente diagrama UML de despliegue ilustra la topología física y lógica de ejecución del sistema dentro de la infraestructura del CGMLTI:

```mermaid
flowchart TD
    %% Clientes externos
    Cliente[<<"\<Device\>">>\n Navegador Web Estudiante / Admin]
    
    %% Datacenter SENA CGMLTI
    subgraph Datacenter_SENA[<<"\<Datacenter\>">>\n SENA - Sede CGMLTI]
        
        %% Kubernetes Cluster Node
        subgraph Cluster_K8s[<<"\<Cluster Kubernetes\>">>\n Orquestador de Contenedores Docker]
            
            Ingress[<<"\<Ingress Controller\>">>\n NGINX Gateway]
            
            %% Frontend Worker Node
            subgraph Node_FE[<<"\<Worker Node\>">>\n Capa de Presentación]
                Pod_FE(<<"\<Pod / Docker Container\>">>\n App Vue.js Servida por Nginx)
            end
            
            %% Backend Worker Node
            subgraph Node_BE[<<"\<Worker Node\>">>\n Capa de Lógica de Negocio]
                Pod_BE(<<"\<Pod / Docker Container\>">>\n API Node.js/Express)
                Auth_Service(<<"\<Pod / Docker Container\>">>\n API de Autenticación - Supabase GoTrue)
            end
        end
        
        %% Base de datos Node
        subgraph Node_DB[<<"\<Servidor de Datos\>">>\n VM o Servidor Dedicado]
            Postgres[(<<"\<Database\>">>\n Motor PostgreSQL)]
        end
    end

    %% Conexiones y Protocolos
    Cliente -- "HTTPS (:443)" --> Ingress
    
    Ingress -- "HTTP / Rutas Estáticas" --> Pod_FE
    Ingress -- "HTTP /api/*" --> Pod_BE
    Ingress -- "HTTP /auth/*" --> Auth_Service
    
    Pod_BE -. "TCP (:5432) Driver Pg" .-> Postgres
    Auth_Service -. "TCP (:5432) Credenciales" .-> Postgres
```

*(Nota: En Mermaid se utilizan los estereotipos clásicos de UML `<<type>>` integrados dentro de un flowchart para simular Nodos y Artefactos, siendo la solución oficial para Diagramas de Despliegue).*

---

## 📦 Estrategia de Contenedores (Docker)

La aplicación ha sido dividida pensando en el aislamiento total de procesos:

1. **Frontend**: Se empaquetará mediante un `Dockerfile` en una fase de compilación (Node.js) y una fase de publicación donde los estáticos se inyectan en una imagen ligera de **Nginx** (`nginx:alpine`).
2. **Backend**: El código de la API se empaquetará en una imagen ligera de **Node.js** (`node:18-alpine` o superior).
3. **Persistencia y Auth**: Se utilizarán las imágenes oficiales en Dockerhub de **PostgreSQL** y los servicios de **Supabase** adaptados para *Self-Hosting*.

## ☸️ Orquestación en Kubernetes CGMLTI

El entorno del Datacenter requerirá configurar los siguientes objetos en el clúster (mediante archivos manifiesto YAML):

- **Deployments / ReplicaSets**: Se configurarán múltiples réplicas de los contenedores del `Frontend` y del `Backend` para garantizar Alta Disponibilidad (HA) y tolerancia a fallos en caso de que un nodo trabajador del CGMLTI se caiga.
- **Services (ClusterIP)**: Únicos encargados de comunicar los Pods entre sí de manera interna y privada.
- **Ingress Controller**: Administrará los certificados SSL y funcionará como balanceador de carga, enrutando el tráfico web que llegue a la red del SENA hacia el servicio correspondiente en función de la URL (ej. `/api/` hacia Node, `/` hacia la interfaz web).
- **ConfigMaps y Secrets**: Almacenarán las variables de entorno necesarias (conexión a DB, llaves maestras, secretos JWT) de forma cifrada y segura dentro del clúster del SENA, separando completamente el código fuente de la configuración de infraestructura.

## 🔄 Flujo Típico de Deploy (CI/CD propuesto)

1. El código es aprobado mediante *Code Review* y combinado (merge) en la rama `main` del repositorio oficial.
2. Automáticamente (ej: vía GitHub Actions / GitLab CI) se hace el **Docker Build** de las imágenes.
3. Se hace **Push** del contenedor resultante a un *Container Registry* privado de la entidad.
4. El clúster K8s del CGMLTI ejecuta un **Rolling Update** descargando las nuevas imágenes y reemplazando los contenedores antiguos paulatinamente sin generar caída del servicio (Zero-Downtime deployment).

---

[← Volver al inicio](00_START_HERE.md)
