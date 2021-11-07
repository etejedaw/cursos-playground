import Sofa from './Interfaces/Sofa';

class ModernSofa implements Sofa{
    private legs: number;

    constructor(){
        this.legs = 1;
    }

    getLegs(): number{
        return this.legs;
    }

    sitOn(): void{
        console.log("Sentado en sofá moderno");
    }
}

export default ModernSofa;