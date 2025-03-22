import { App } from "./lib/hono";
import v1 from "./modules/v1";

const app = App();

app.route("/v1", v1);

export default app;
