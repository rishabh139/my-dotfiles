"use strict";var h=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var S=(t,r)=>{for(var e in r)h(t,e,{get:r[e],enumerable:!0})},$=(t,r,e,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of P(r))!x.call(t,o)&&o!==e&&h(t,o,{get:()=>r[o],enumerable:!(s=A(r,o))||s.enumerable});return t};var T=t=>$(h({},"__esModule",{value:!0}),t);var v={};S(v,{default:()=>C});module.exports=T(v);var E=require("@raycast/api");var c=require("@raycast/api");var i=(o=>(o.Bash="bash",o.Zsh="zsh",o.Fish="fish",o.Sh="sh",o))(i||{}),p=t=>Object.values(i).includes(t);var f=require("@raycast/api");var a=()=>{let{alacrittyPath:t,shellPath:r}=(0,f.getPreferenceValues)();if(t.split("/").pop()!=="alacritty")throw new Error(`Invalid Alacritty path: ${t}`);let e=r.split("/").pop();if(!e||!p(e))throw new Error(`Invalid shell: ${e} (use ${Object.values(i).join(", ")})`);return{alacrittyPath:t,shellPath:r,shell:e}};var l=require("fs/promises");var w=require("child_process");var u=t=>new Promise((r,e)=>{let{alacrittyPath:s}=a(),o=(0,w.spawn)(s,t);o.on("error",n=>{if(n.message.includes("ENOENT")){e(new Error(`Alacritty not found at path: ${s}`));return}e(n)}),o.stderr.on("data",n=>e(new Error(n.toString()))),o.on("close",n=>r(n))});var y=async t=>{let{shellPath:r}=a();try{await(0,l.access)(r,l.constants.X_OK)}catch(e){if(e instanceof Error){if(e.message.includes("ENOENT"))throw new Error(`Shell not found at path: ${r}`);if(e.message.includes("EACCES"))throw new Error(`Shell not executable at path: ${r}`)}throw e}return await u(["--command",r,"-c",t])};var b=t=>[`echo '${t}
'`,t,`echo '
Press any key to exit.
'`,a().shell==="zsh"?"read -k1 -s":"read -s -n1"].join(" ; "),d=async(t,r)=>await(0,c.confirmAlert)({title:`Run command from ${t}`,message:`Run the following command?

${r}`,primaryAction:{title:"Run",style:c.Alert.ActionStyle.Destructive,onAction:async()=>{let e=b(r);await y(e)}}});var m=require("@raycast/api"),g=t=>async()=>{try{await t()}catch(r){await(0,m.showToast)({title:"Error",message:r instanceof Error?r.message:String(r),style:m.Toast.Style.Failure})}};var C=g(async()=>{let{text:t}=await E.Clipboard.read();if(!t.length)throw new Error("Clipboard is empty");await d("clipboard",t)});