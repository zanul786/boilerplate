import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'minutesToHour'
})

export class MinutesToHourPipe implements PipeTransform {
    transform(value: string) {
        if(value){
            let hours = Math.round(parseInt(value) / 60);
            let minutes = parseInt(value) % 60;
            return `${hours}:${minutes < 10 ? '0'+minutes : minutes}`;
        }else{
            return `0:00`;
        }
    }
}
