import Transport from "./Transport";

interface Logistics{
    createTransport(type: unknown, model: string): Transport;
}

export default Logistics;