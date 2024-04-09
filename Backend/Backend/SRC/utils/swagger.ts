// import { Express, Request, Response } from "express";
// import swaggerJsdoc from "swagger-jsdoc";
// import log from "./logger"
// import swaggerUi from "swagger-ui-express";
// import { version } from "../../../package.json";
// // import fs from "fs";

// // const options: swaggerJsdoc.Options = {
// //     definition: {
// //         openapi: "3.0.0",
// //         info: {
// //             title: "My Brand Backend v1.0",
// //             description:
// //                 "Welcome to My Brand Backend API. This API serves as the backbone for managing various aspects of My Brand, providing essential functionalities to power your application. It offers endpoints for user authentication, blog management, image uploads, and much more. With robust security measures and intuitive design, My Brand Backend API empowers developers to build powerful applications with ease.",
// //             version: "v1.0",
// //         },
// //         components: {
// //             securitySchemes: {
// //                 bearerAuth: {
// //                     type: "apiKey",
// //                     name: "x-auth-token",
// //                     in: "header",
// //                     description: "Bearer token authorization",
// //                 },
// //             },
// //             schemas: {
// //                 User: {
// //                     type: 'object',
// //                     properties: {
// //                         names: { type: 'string' },
// //                         email: { type: 'string' },
// //                         password: { type: 'string' },
// //                         isAdmin: { type: 'boolean' },
// //                     },
// //                     required: ['names', 'email', 'password', 'isAdmin'],
// //                 },
// //                 Blog: {
// //                     type: 'object',
// //                     properties: {
// //                         title: { type: 'string' },
// //                         content: { type: 'string' },
// //                         imageUrl: { type: 'string' },
// //                         comments: { type: 'array' },
// //                         likes: { type: 'number' },
// //                         creationDate: { type: 'string', format: 'date-time' }
// //                     },
// //                     required: ['title', 'content', 'imageUrl'],
// //                 },
// //                 Message: {
// //                     type: 'object',
// //                     properties: {
// //                         sender: { type: 'string' },
// //                         subject: { type: 'string' },
// //                         content: { type: 'string' },
// //                         email: { type: 'string' },
// //                         date: { type: 'string', format: 'date-time' }
// //                     }
// //                 }
// //             },
// //         },
// //         //   servers: [
// //         //     {
// //         //       url: "http://localhost:3000/docs",
// //         //       description: "Local development environment",
// //         //     },
// //         //     {
// //         //       url: "https://mybrandbackend-q8gq.onrender.com/docs/",
// //         //       description: "Production Environment",
// //         //     },
// //         //   ],

// //     },
// //     apis: ["../server.ts", "../routes/*.ts"],
// //     //apis: ["../../../dist/Backend/SRC/routes/*.js"]
// // };

// const options: swaggerJsdoc.Options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "My Brand Backend v1.0",
//             description:
//                 "Welcome to My Brand Backend API. This API serves as the backbone for managing various aspects of My Brand, providing essential functionalities to power your application. It offers endpoints for user authentication, blog management, image uploads, and much more. With robust security measures and intuitive design, My Brand Backend API empowers developers to build powerful applications with ease.",
//             version: "v1.0",
//         },
//         components: {
//             securitySchemes: {
//                 bearerAuth: {
//                     type: "apiKey",
//                     name: "x-auth-token",
//                     in: "header",
//                     description: "Bearer token authorization",
//                 },
//             },
//         },
//     },
//     apis: ["../server.ts", "../routes/.ts", "./src/schemas/.ts"],
// };


// const swaggerSpec = swaggerJsdoc(options);
// function swaggerDocs(app: Express, port: number) {
//     // Serve Swagger UI
//     app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//     // Serve Swagger JSON
//     app.get("/docs.json", (req: Request, res: Response) => {
//         res.setHeader("Content-Type", "application/json");
//         res.send(swaggerSpec);
//     });

//     // Log Swagger availability
//     log.info(`Swagger docs available at http://localhost:${port}/docs`);
// }

// export default swaggerDocs;

import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import log from "./logger.js";
import fs from "fs"

const options: swaggerJsdoc.Options = {
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

function swaggerDocs(app: Express, port: number) {
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
    app.get("/docs.json", (req: Request, res: Response) => {
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