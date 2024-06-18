"use strict";var M=Object.defineProperty;var J=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var R=Object.prototype.hasOwnProperty;var k=(t,r)=>{for(var o in r)M(t,o,{get:r[o],enumerable:!0})},L=(t,r,o,i)=>{if(r&&typeof r=="object"||typeof r=="function")for(let m of x(r))!R.call(t,m)&&m!==o&&M(t,m,{get:()=>r[m],enumerable:!(i=J(r,m))||i.enumerable});return t};var _=t=>L(M({},"__esModule",{value:!0}),t);var H={};k(H,{default:()=>A});module.exports=_(H);var n=require("@raycast/api"),w=require("react");var h=require("@raycast/api"),v=[{title:"Alarm Clock",icon:h.Icon.Alarm,value:"alarmClock.wav"},{title:"Dismembered Woodpecker",icon:h.Icon.Bird,value:"dismemberedWoodpecker.wav"},{title:"Flute Riff",icon:h.Icon.Music,value:"fluteRiff.wav"},{title:"Level Up",icon:h.Icon.Trophy,value:"levelUp.wav"},{title:"Piano Chime",icon:h.Icon.Music,value:"pianoChime.wav"},{title:"Terminator",icon:h.Icon.BarCode,value:"terminator.wav"},{title:"Speak Timer Name",icon:h.Icon.Person,value:"speak_timer_name"}];var g=require("@raycast/api"),C=require("child_process"),$=require("crypto"),u=require("fs");var O=t=>{let r=Math.floor(t/3600),o=String(Math.floor(t%3600/60)).padStart(2,"0"),i=String(Math.floor(t%60)).padStart(2,"0");return`${r===0?"":r+":"}${o}:${i}`};var a=require("@raycast/api");var E=t=>{let r=(0,a.getPreferenceValues)();if(t.launchedFromMenuBar||r.closeWindowOnTimerStart){let o=t.isErr?"\u26A0\uFE0F":"\u{1F389}";return(0,a.showHUD)(`${o} ${t.msg}`),(0,a.popToRoot)()}else(0,a.showToast)({style:t.isErr?a.Toast.Style.Failure:a.Toast.Style.Success,title:t.msg})};var N=g.environment.supportPath+"/customTimers.json",ee=g.environment.supportPath+"/defaultPresetVisibles.json";var V=(t=!1)=>{let r=(0,g.getPreferenceValues)();return parseFloat(r.volumeSetting)>5?(E({msg:"Timer alert volume should not be louder than 5 (it can get quite loud!)",launchedFromMenuBar:t,isErr:!0}),!1):!0};async function I({timeInSeconds:t,timerName:r="Untitled",launchedFromMenuBar:o=!1,selectedSound:i="default"}){let d=(g.environment.supportPath+"/"+new Date().toISOString()+"---"+t+".timer").replace(/:/g,"__");(0,u.writeFileSync)(d,r);let f=(0,g.getPreferenceValues)(),S=`${g.environment.assetsPath+"/"+(i==="default"?f.selectedSound:i)}`,c=[`sleep ${t}`];c.push(`if [ -f "${d}" ]; then osascript -e 'display notification "Timer \\"${r}\\" complete" with title "Ding!"'`);let b=`afplay "${S}" --volume ${f.volumeSetting.replace(",",".")}`;if(f.selectedSound==="speak_timer_name"?c.push(`say "${r}"`):c.push(b),f.ringContinuously){let p=`${d}`.replace(".timer",".dismiss");(0,u.writeFileSync)(p,".dismiss file for Timers"),c.push(`while [ -f "${p}" ]; do ${b}; done`)}c.push(`rm "${d}"; else echo "Timer deleted"; fi`),(0,C.exec)(c.join(" && "),(p,T)=>{if(p){console.log(`error: ${p.message}`);return}if(T){console.log(`stderr: ${T}`);return}}),E({msg:`Timer "${r}" started for ${O(t)}!`,launchedFromMenuBar:o,isErr:!1})}function P(){(0,u.existsSync)(N)||(0,u.writeFileSync)(N,JSON.stringify({}))}function B(t){P();let r=JSON.parse((0,u.readFileSync)(N,"utf8"));r[(0,$.randomUUID)()]=t,(0,u.writeFileSync)(N,JSON.stringify(r))}var l=require("react/jsx-runtime");function A(t){let r=Object.values(t.arguments).some(e=>e!==""),[o,i]=(0,w.useState)(),[m,d]=(0,w.useState)(),[f,S]=(0,w.useState)(),c=(0,n.getPreferenceValues)(),b=e=>{if(P(),e.hours===""&&e.minutes===""&&e.seconds==="")new n.Toast({style:n.Toast.Style.Failure,title:"No values set for timer length!"}).show();else if(isNaN(Number(e.hours)))i("Hours must be a number!");else if(isNaN(Number(e.minutes)))d("Minutes must be a number!");else if(isNaN(Number(e.seconds)))S("Seconds must be a number!");else{if(!V())return;(0,n.closeMainWindow)();let s=e.name?e.name:"Untitled",D=3600*Number(e.hours)+60*Number(e.minutes)+Number(e.seconds);I({timeInSeconds:D,timerName:s,selectedSound:e.selectedSound}),e.willBeSaved&&B({name:e.name,timeInSeconds:D,selectedSound:e.selectedSound,showInMenuBar:!0})}},p=()=>{o&&o.length>0&&i(void 0)},T=()=>{m&&m.length>0&&d(void 0)},F=()=>{f&&f.length>0&&S(void 0)},y=[{id:"hours",title:"Hours",placeholder:"0",err:o,drop:p,validator:e=>{let s=e.target.value;isNaN(Number(s))?i("Hours must be a number!"):p()}},{id:"minutes",title:"Minutes",placeholder:"00",err:m,drop:T,validator:e=>{let s=e.target.value;isNaN(Number(s))?d("Minutes must be a number!"):T()}},{id:"seconds",title:"Seconds",placeholder:"00",err:f,drop:F,validator:e=>{let s=e.target.value;isNaN(Number(s))?S("Seconds must be a number!"):F()}}];return c.newTimerInputOrder!=="hhmmss"&&y.reverse(),(0,l.jsxs)(n.Form,{actions:(0,l.jsx)(n.ActionPanel,{children:(0,l.jsx)(n.Action.SubmitForm,{title:"Start Custom Timer",onSubmit:e=>b(e)})}),children:[y.map((e,s)=>(0,l.jsx)(n.Form.TextField,{id:e.id,title:e.title,placeholder:e.placeholder,defaultValue:t.arguments[e.id],error:e.err,onChange:e.drop,onBlur:e.validator},s)),(0,l.jsxs)(n.Form.Dropdown,{id:"selectedSound",defaultValue:"default",title:"Sound",children:[(0,l.jsx)(n.Form.Dropdown.Item,{value:"default",title:"Default"}),v.map((e,s)=>(0,l.jsx)(n.Form.Dropdown.Item,{title:e.value===c.selectedSound?`${e.title} (currently selected)`:e.title,value:e.value,icon:e.icon},s))]}),(0,l.jsx)(n.Form.TextField,{id:"name",title:"Name",placeholder:"Pour Tea",autoFocus:r}),(0,l.jsx)(n.Form.Checkbox,{id:"willBeSaved",label:"Save as preset"})]})}
