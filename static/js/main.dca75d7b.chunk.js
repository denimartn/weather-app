(this["webpackJsonpweather-app"]=this["webpackJsonpweather-app"]||[]).push([[0],{18:function(e,t,a){e.exports=a(46)},23:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(15),o=a.n(c),m=(a(23),a(4)),l=a.n(m),s=a(16),i=a(17),u=a(3),d=(a(25),a(26),a(5)),p=a.n(d),f=function(e){return r.a.createElement("form",{onSubmit:e.onSubmit},r.a.createElement("div",{className:"input-wrapper max-w-md mx-auto px-2 py-2 flex"},r.a.createElement("input",{className:"shadow appearance-none border rounded-lg py-2 px-3 text-grey-darker mr-1 bg-white focus:outline-none  w-full",type:"text",placeholder:"Enter a city",onChange:function(t){return e.setInputValue(t.target.value)}}),r.a.createElement("button",{type:"submit",className:"bg-dodgerblue-400  appearance-none border rounded-lg py-2 px-3 text-white mr-1 font-bold focus:outline-none "},"Search")))},h=(a(44),function(e){return r.a.createElement("div",{key:e.index,className:"card shadow-lg px-4 py-4 mr-4 bg-white"},r.a.createElement("h2",{className:"date text-center mb-4 text-sm"},e.date),r.a.createElement("div",{className:"flex"},r.a.createElement("img",{className:"icon mb-2 w-10 h-10 mx-auto mt-2 mb-4",alt:"weather icon",src:e.src})),r.a.createElement("div",{className:"flex justify-between mb-4"},r.a.createElement("p",{className:"temp mr-6 font-medium"},e.minTemp,"\xb0"),r.a.createElement("p",{className:"temp font-medium"},e.maxTemp,"\xb0")),r.a.createElement("p",{className:"description text-center"},e.description))});function w(e){return Math.floor(e)}function b(e){var t="",a=new Date(e),n=new Date;if(a.toDateString()===n.toDateString())t="Today";else{t=new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric"}).format(a)}return t}a(45);var x=function(e){return r.a.createElement("div",{className:"cards px-4 py-4 flex justify-center"},e.locationWeather.map((function(e,t){return r.a.createElement(h,{key:t,date:b(e.applicable_date),src:"https://www.metaweather.com/static/img/weather/".concat(e.weather_state_abbr,".svg"),minTemp:w(e.min_temp),maxTemp:w(e.max_temp),description:e.weather_state_name})})))};var y=function(){var e=r.a.useState(""),t=Object(u.a)(e,2),a=t[0],n=t[1],c=r.a.useState([]),o=Object(u.a)(c,2),m=o[0],d=o[1],h=r.a.useState("empty"),w=Object(u.a)(h,2),b=w[0],y=w[1],g=function(){var e=Object(i.a)(l.a.mark((function e(t){var r,c,o,m,i,u,f,h,w;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),y("loading"),e.prev=2,r="https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api",c=a,e.next=7,p.a.get("".concat(r,"/location/search/?query=").concat(c));case 7:if((o=e.sent).data[0]){e.next=11;break}return y("empty"),e.abrupt("return");case 11:return m=o.data[0].woeid,e.next=14,p.a.get("".concat(r,"/location/").concat(m));case 14:i=e.sent,u=[],f=Object(s.a)(i.data.consolidated_weather);try{for(f.s();!(h=f.n()).done;)w=h.value,u.push(w)}catch(l){f.e(l)}finally{f.f()}y("ready"),d(u),n(""),e.next=27;break;case 23:e.prev=23,e.t0=e.catch(2),console.log(e.t0),y("error");case 27:case"end":return e.stop()}}),e,null,[[2,23]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"main-container w-full "},r.a.createElement("div",{className:"title  font-bold text-4xl mb-2 mt-8 text-center"},"Weather forecast"),r.a.createElement("p",{className:"subtitle text-center mb-2 text-sm"},"Made by"," ",r.a.createElement("a",{className:"subtitle text-sm",href:"https://github.com/denimartn"},"Denise")),r.a.createElement(f,{onSubmit:g,setInputValue:n}),r.a.createElement("div",{className:"container mx-auto px-2 flex justify-center mt-5"},"loading"===b?r.a.createElement("div",{className:"flex justify-center mt-5"},r.a.createElement("div",{className:"loader ease-linear 0 rounded-full border-8 border-t-8  h-20 w-20"})):null,"error"===b?r.a.createElement("button",{className:"error bg-red-100 border border-red-400 text-red p-2 rounded mx-auto ",onClick:function(){y("empty")}},"Hey, something seriously went wrong!"):null,"ready"===b?r.a.createElement(x,{locationWeather:m}):null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.dca75d7b.chunk.js.map