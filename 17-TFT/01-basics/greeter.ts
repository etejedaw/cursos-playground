export function greeter() {
	return {
		helloWorld: () => "Hello World!",
		helloPerson: (name: string) => `Hello ${name}!`
	};
}
