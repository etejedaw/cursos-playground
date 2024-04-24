import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
	@Get("/hello-world")
	getRootRoute() {
		return "Hello World!";
	}

	@Get("/bye-there")
	getByeThere() {
		return "Bye There!";
	}
}
