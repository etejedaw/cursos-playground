import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "mayusculas"
})
export class MayusculasPipe implements PipeTransform {

    transform(value: string, enMayusculas: boolean = true): string {
        if(enMayusculas) return value.toUpperCase();
        return value.toLowerCase();
    }

}