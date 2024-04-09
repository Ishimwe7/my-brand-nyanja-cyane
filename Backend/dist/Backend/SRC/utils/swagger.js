// import { Express, Request, Response } from "express";
// import swaggerJsdoc from "swagger-jsdoc";
// import log from "./logger"
// import swaggerUi from "swagger-ui-express";
// import { version } from "../../../package.json";
// // import fs from "fs";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import log from "./logger.js";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MY BRAND API",
            version: "0.1"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        names: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                        isAdmin: { type: 'boolean' },
                    },
                    required: ['names', 'email', 'password', 'isAdmin'],
                },
                Blog: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        content: { type: 'string' },
                        imageUrl: { type: 'string' },
                        comments: { type: 'array' },
                        likes: { type: 'number' },
                        creationDate: { type: 'string', format: 'date-time' }
                    },
                    required: ['title', 'content', 'imageUrl'],
                },
                Message: {
                    type: 'object',
                    properties: {
                        sender: { type: 'string' },
                        subject: { type: 'string' },
                        content: { type: 'string' },
                        email: { type: 'string' },
                        date: { type: 'string', format: 'date-time' }
                    }
                }
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./Backend/SRC/server.ts", "./Backend/SRC/routes/*.ts"],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
    // Serve Swagger UI
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // app.use(
    //     "/docs",
    //     swaggerUi.serve,
    //     swaggerUi.setup(swaggerSpec, {
    //         customCss: `
    //       ${fs.readFileSync("./src/utils/SwaggerDark.css")}
    //     `,
    //     })
    // );
    // Serve Swagger JSON
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    // Log Swagger availability
    // log.info(`Swagger docs available at http://localhost:${port}/docs`);
    app.use((req, res, next) => {
        const host = req.get("host");
        const protocol = req.protocol;
        log.info(`Swagger docs available at ${protocol}://${host}/docs`);
        next();
    });
}
export default swaggerDocs;
