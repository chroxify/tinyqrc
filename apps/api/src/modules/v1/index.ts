import { App } from "@/lib/hono";
import { registerHealth } from "./health";
import { registerQR } from "./qr";

const v1 = App();

/*
 * /v1/health
 */
registerHealth(v1);

/*
 * /v1/qr
 */
registerQR(v1);

export default v1;
