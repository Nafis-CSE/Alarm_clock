const clock = document.querySelector(".clock");
const setBtn = document.querySelector("#set");
const alarmList = document.querySelector(".alarmList");
setInterval(()=>{
    let date = new Date;
    let h = date.getHours().toString().padStart(2, "0");
    let m = date.getMinutes().toString().padStart(2, "0");
    let s = date.getSeconds().toString().padStart(2, "0");
    clock.textContent = `${h}:${m}:${s}`;                   //the clock
    checkAlarm(h, m, s);                // ⏰ time check
}, 1000);

let hours = document.querySelector("#hours");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds"); 
for(let i = 0 ; i <= 24; i++){
    let option = document.createElement("option");
    option.value = i.toString().padStart(2,'0');
    option.text = i.toString().padStart(2,'0');
    hours.appendChild(option);
};
for(let i = 0 ; i <= 60; i++){
    let option = document.createElement("option");
    option.value = i.toString().padStart(2,'0');
    option.text = i.toString().padStart(2,'0');
    minutes.appendChild(option);
};
for(let i = 0 ; i <= 60; i++){
    let option = document.createElement("option");
    option.value = i.toString().padStart(2,'0');
    option.text = i.toString().padStart(2,'0');
    seconds.appendChild(option);
};


let show = ()=>{                             //show seted alarms
    alarmList.innerHTML = "";
    let timeArr = JSON.parse(localStorage.getItem("alarms"))|| [];
    timeArr.forEach((alarm,index) => {
        let div = document.createElement("div");
        div.className= "show";
        div.innerHTML = `Alarm ${index +1}--:${alarm.hours}:${alarm.minutes}:${alarm.seconds}`;
        
        alarmList.appendChild(div);

     let removeBtn = document.createElement("button");    // remove alarms
    removeBtn.textContent = "remove";
    removeBtn.className= "removeBtn";
    div.appendChild(removeBtn);
    removeBtn.addEventListener("click",()=>{
     let timeArr = JSON.parse(localStorage.getItem("alarms") )|| [];
     timeArr.splice(index,1);
     localStorage.setItem("alarms",JSON.stringify(timeArr));
     show();
    });
    });
    
};
show();

let add = ()=>{                               //add alarms
    let h = hours.value.padStart(2,"0");
    let m = minutes.value.padStart(2,"0");
    let s = seconds.value.padStart(2,"0");
    let timeArr = JSON.parse(localStorage.getItem("alarms") )|| [];
    timeArr.push({hours :h, minutes : m, seconds: s});
    localStorage.setItem("alarms",JSON.stringify(timeArr));
}

setBtn.addEventListener("click",()=>{
    add();
    show();
    hours.value = "00";
    minutes.value = "00";
    seconds.value = "00";
});

function checkAlarm(h, m, s) {                  //play audio after checking
    let timeArr = JSON.parse(localStorage.getItem("alarms") )|| [];
    timeArr.forEach((alarm)=>{
         if (alarm.hours === h && alarm.minutes === m && alarm.seconds === s) {
            let sound = new Audio("img_&_audio/audio.mp3");
            sound.play(); 
        }
    });
};