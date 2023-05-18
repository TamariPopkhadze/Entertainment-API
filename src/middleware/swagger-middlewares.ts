import SwaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "entertainment",
};

const swaggerDocument = YAML.load("./src/database/swager.yaml");
export default [SwaggerUI.serve, SwaggerUI.setup(swaggerDocument, options)];