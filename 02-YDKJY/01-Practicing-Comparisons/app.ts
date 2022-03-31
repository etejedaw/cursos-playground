const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime: string, durationMinutes: number): boolean{
    const dayStartTime = splitTime(dayStart);
    const dayEndTime = splitTime(dayEnd);
    const meetingStartTime = splitTime(startTime);
    const meetingEndTime = sumTime(startTime, durationMinutes);
    return compareTime(dayStartTime, dayEndTime, meetingStartTime, meetingEndTime);
}

function sumTime(date: string, duration: number): time{
    const newDurationHours = Math.trunc(duration/60);
    const newDurationMinutes = duration%60;
    const {hours, minutes} = splitTime(date);
    const newHours = hours+newDurationHours;
    const newMinutes = minutes+newDurationMinutes;
    return {hours: newHours, minutes: newMinutes};
}

function splitTime(date: string): time{
    const daySplitted = date.split(":");
    let hours = parseInt(daySplitted[0]);
    let minutes = parseInt(daySplitted[1]);
    return {hours, minutes};
}

function compareTime(startTime: time, endTime: time, meetingStartTime: time, meetingEndTime: time): boolean{
    if(meetingStartTime.hours >= startTime.hours){
        if(meetingStartTime.hours === startTime.hours){
            if(meetingStartTime.minutes >= startTime.minutes) return true;
            return false;    
        }
        if(meetingEndTime.hours < endTime.hours) return true;
        if(meetingEndTime.hours === endTime.hours){
            if(meetingEndTime.minutes <= endTime.minutes) return true;
            return false
        }
    }
    return false;   
}

type time = {
    hours: number,
    minutes: number
}

console.log(scheduleMeeting("7:00", 15));
console.log(scheduleMeeting("7:05", 30));
console.log(scheduleMeeting("7:30", 30));
console.log(scheduleMeeting("11:30", 60));
console.log(scheduleMeeting("17:00", 45));
console.log(scheduleMeeting("17:30", 30));
console.log(scheduleMeeting("18:00", 15));