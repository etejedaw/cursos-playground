import Sofa from './Sofa';

class VictorianSofa implements Sofa{
    private legs: number;

    constructor(){
        this.legs = 4;
    }

    getLegs(): number{
        return this.legs;
    }

    sitOn(): void{
        console.log("Sentado en sofá victoriano");
    }
}

export default VictorianSofa;