const Deprecated = (deprecationReason: string) => {
    return (_target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            propertyDescriptor.value.apply(this, args); 
          }
          return wrapperFn;
        }
      }
    }   
}

export class Pokemon {
    
    constructor(
        public readonly id: number,
        public name: string
    ) {}

    scream(): string {
        return this.name.toUpperCase();
    }

    @Deprecated('Most use speak2 method instead')
    speak() {
        return console.log(`${ this.name }, ${ this.name }!`)
    }

    speak2(): string {
        return "Hello";
    }

}

export const charmander = new Pokemon(4, "charmander");