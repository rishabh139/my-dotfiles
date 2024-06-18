"use strict";var f=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var D=Object.prototype.hasOwnProperty;var $=(e,t)=>{for(var r in t)f(e,r,{get:t[r],enumerable:!0})},E=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of O(t))!D.call(e,a)&&a!==r&&f(e,a,{get:()=>t[a],enumerable:!(o=P(t,a))||o.enumerable});return e};var N=e=>E(f({},"__esModule",{value:!0}),e);var F={};$(F,{default:()=>b});module.exports=N(F);var y=require("@raycast/api");var s=require("@raycast/api"),S=require("child_process");var i=require("fs");var h=e=>{let t=Math.floor(e/3600),r=String(Math.floor(e%3600/60)).padStart(2,"0"),o=String(Math.floor(e%60)).padStart(2,"0");return`${t===0?"":t+":"}${r}:${o}`};var n=require("@raycast/api");var d=e=>{let t=(0,n.getPreferenceValues)();if(e.launchedFromMenuBar||t.closeWindowOnTimerStart){let r=e.isErr?"\u26A0\uFE0F":"\u{1F389}";return(0,n.showHUD)(`${r} ${e.msg}`),(0,n.popToRoot)()}else(0,n.showToast)({style:e.isErr?n.Toast.Style.Failure:n.Toast.Style.Success,title:e.msg})};var V=s.environment.supportPath+"/customTimers.json",_=s.environment.supportPath+"/defaultPresetVisibles.json";var T=(e=!1)=>{let t=(0,s.getPreferenceValues)();return parseFloat(t.volumeSetting)>5?(d({msg:"Timer alert volume should not be louder than 5 (it can get quite loud!)",launchedFromMenuBar:e,isErr:!0}),!1):!0};async function M({timeInSeconds:e,timerName:t="Untitled",launchedFromMenuBar:r=!1,selectedSound:o="default"}){let c=(s.environment.supportPath+"/"+new Date().toISOString()+"---"+e+".timer").replace(/:/g,"__");(0,i.writeFileSync)(c,t);let l=(0,s.getPreferenceValues)(),w=`${s.environment.assetsPath+"/"+(o==="default"?l.selectedSound:o)}`,u=[`sleep ${e}`];u.push(`if [ -f "${c}" ]; then osascript -e 'display notification "Timer \\"${t}\\" complete" with title "Ding!"'`);let p=`afplay "${w}" --volume ${l.volumeSetting.replace(",",".")}`;if(l.selectedSound==="speak_timer_name"?u.push(`say "${t}"`):u.push(p),l.ringContinuously){let m=`${c}`.replace(".timer",".dismiss");(0,i.writeFileSync)(m,".dismiss file for Timers"),u.push(`while [ -f "${m}" ]; do ${p}; done`)}u.push(`rm "${c}"; else echo "Timer deleted"; fi`),(0,S.exec)(u.join(" && "),(m,g)=>{if(m){console.log(`error: ${m.message}`);return}if(g){console.log(`stderr: ${g}`);return}}),d({msg:`Timer "${t}" started for ${h(e)}!`,launchedFromMenuBar:r,isErr:!1})}var b=async()=>{T()&&(await(0,y.closeMainWindow)(),await M({timeInSeconds:60*30,timerName:"30 Minute Timer"}))};
