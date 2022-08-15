class NewPokemon {
    constructor(
        public readonly id: number,
        public name: string
    ) {}

    scream(): string {
        return `NO QUIERO!!`;
    }

    speak(): string {
        return `NO QUIERO HABLAR!!`;
    }
}

const MyDecorator = () => {
    return (_target: Function) => {
        return NewPokemon;
    }
}

@MyDecorator()
export class Pokemon {
    
    constructor(
        public readonly id: number,
        public name: string
    ) {}

    scream(): string {
        return this.name.toUpperCase();
    }

    speak(): string {
        return this.name.repeat(2);
    }

}

export const charmander = new Pokemon(4, "charmander");