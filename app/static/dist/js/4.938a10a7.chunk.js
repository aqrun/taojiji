(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[4],{330:function(e,t,r){"use strict";r.r(t);var n=r(1),c=r.n(n),a=r(9),o=r(315),i=r(67),u=r(321),l=r(313),s=r(318),f=r(316),p=Object(f.a)("SET_TABLE_LIST",(function(e){return function(t){return e({table_list:t})}})),b=Object(f.a)("REFRESH_TABLE_LIST",(function(e){return function(t,r){return e({pager:t,params:r})}})),O=Object(f.a)("SET_PAGER",(function(e){return function(t){return e({pager:t})}})),d=Object(f.a)("SET_SORT",(function(e){return function(t){return e({sort:t})}})),j=Object(f.a)("SET_SEARCH_FILTER",(function(e){return function(t){return e({filter:t})}})),y=Object(f.a)("SET_TABLE_FILTER",(function(e){return function(t){return e({filter:t})}})),g=Object(f.a)("SET_TABLE_LIST_LOADING",(function(e){return function(t){return e({loading:t})}})),m=Object(f.a)("SET_USER_DATA",(function(e){return function(t,r){return e({username:t,age:r})}}));function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var h={created_at:{name:"created_at",dir:"desc"}},w={data:[],loading:!1,pager:{current:1,pageSize:10,pageSizeOptions:["10","20","50","100","1000"],showSizeChanger:!0,showQuickJumper:!0,showTotal:function(e){return"Total:".concat(e)}},search_filter:{},table_filter:{},sort:h},E=Object(s.a)({table:w}),_=Object(f.b)(E,(function(e){return[e(p,(function(e,t){var r=t.payload;return e.setIn(["table","data"],Object(s.a)(r.table_list))})),e(O,(function(e,t){var r=t.payload,n=e.setIn(["table","pager"],Object(s.a)(r.pager));return console.log("handle pager reducer",n.getIn(["table","pager"]).toJS()),n})),e(d,(function(e,t){var r=t.payload;return console.log("===sort",r.sort),e.setIn(["table","sort"],Object(s.a)(r.sort))})),e(j,(function(e,t){var r=t.payload;return e.setIn(["table","search_filter"],Object(s.a)(r.filter))})),e(y,(function(e,t){var r=t.payload;return e.setIn(["table","table_filter"],Object(s.a)(r.filter))})),e(g,(function(e,t){var r=t.payload;return e.setIn(["table","loading"],r.loading)})),e(m,(function(e,t){var r=t.payload,n=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(r,!0).forEach((function(t){Object(l.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e.toJS(),{},r);return Object(s.a)(n)}))]})),P=Object(i.c)({orderList:_}),S=r(323),I=r(326),k=r(327),x=r(325),D=r(85),T=r(324),L=r(319);function J(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var z=function(e){return e.orderList.getIn(["table","data"])},A=function(e){return e.orderList.getIn(["table","pager"])},R=function(e){return e.orderList.getIn(["table","loading"])},B=function(e){return e.orderList.getIn(["table","sort"])},C=Object(L.a)([function(e){return e.orderList.getIn(["table","search_filter"])},function(e){return e.orderList.getIn(["table","table_filter"])}],(function(e,t){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?J(r,!0).forEach((function(t){Object(l.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):J(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e.toJS(),{},t.toJS())})),N=Object(L.a)([A,C,B],(function(e,t,r){return{current:e.get("current"),pageSize:e.get("pageSize"),sort:r.toJS(),filter:t}}));function F(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var H=S.a.Content,K=function(e){var t={},r=Object(o.c)(z),a=Object(o.c)(A),i=(Object(o.c)(B),Object(o.c)(R)),u=Object(o.c)(N),s=Object(o.b)(),f=function(){console.log("fetch table list",t,u),s(b(t,u))};return Object(n.useEffect)((function(){t=a.toJS(),console.log("update",t)})),Object(n.useEffect)((function(){t=a.toJS(),f()}),[]),c.a.createElement(S.a,{className:"layout",style:{background:"white"}},c.a.createElement(I.a,null,c.a.createElement(k.a,{span:24},c.a.createElement(H,null,c.a.createElement(x.a,null,c.a.createElement(x.a.Item,null,"Home")),c.a.createElement("div",null,c.a.createElement("div",{className:"clearfix",style:{margin:"10px 0"}},c.a.createElement(D.a,{icon:"plus",type:"primary",size:"small"},"\u8f93\u5165\u6dd8\u5b9d\u8ba2\u5355"),c.a.createElement(D.a,{icon:"upload",type:"primary",size:"small",style:{marginLeft:"15px"}},"\u5904\u7406\u6dd8\u96c6\u96c6\u8ba2\u5355")),c.a.createElement(T.a,{dataSource:r.toJS(),columns:[{title:"ID",dataIndex:"id",key:"id",sorter:!0,width:60},{title:"\u8ba2\u5355\u53f7",dataIndex:"order_id",key:"order_id"},{title:"\u6536\u8d27\u4eba",dataIndex:"receiver_name",key:"receiver_name"},{title:"\u7535\u8bdd",dataIndex:"receiver_cellphone",key:"receiver_cellphone"},{title:"\u6536\u8d27\u5730\u5740",dataIndex:"receiver_address",key:"receiver_address"},{title:"\u5feb\u9012\u516c\u53f8",dataIndex:"logistic_company_name",key:"logistic_company_name"},{title:"\u8fd0\u5355\u53f7",dataIndex:"logistic_bill_number",key:"logistic_bill_number"},{title:"\u4e0b\u5355\u65f6\u95f4",dataIndex:"create_time",key:"create_time"}],loading:i,pagination:a.toJS(),onChange:function(e,r,n){var c=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?F(r,!0).forEach((function(t){Object(l.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):F(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},t,{current:e.current,pageSize:e.pageSize}),a=c.current,o={},i=!1;if("undefined"!=typeof n.columnKey){var u=n.columnKey,p="ascend"==n.order?"asc":"desc";o.key={name:u,dir:p},i=!0}o=i?o:h,c.current=a,s(O(c)),s(d(o)),console.log("handle change",c,o),setTimeout((function(){f()}),1e3)},size:"small",bordered:!0,rowKey:"id"}))))))},G=function(e){return c.a.createElement(K,null)},U=r(314),M=r.n(U),Q=r(320),q=r(317);function V(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var W={Accept:"application/json","Content-Type":"application/json"},X=window.g;function Y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t="".concat(X.baseUrl,"tb-order-list"),r=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?V(r,!0).forEach((function(t){Object(l.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):V(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},{},{},e),n=!1;return new Promise((function(e,c){fetch(t,{method:"post",headers:W,credentials:"same-origin",body:JSON.stringify(r)}).then((function(e){return n=e.ok,e.ok,e.json()})).then((function(t){n?e(t):c(t)})).catch((function(e){c(e)}))}))}var Z=M.a.mark(re),$=M.a.mark(ne);function ee(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function te(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ee(r,!0).forEach((function(t){Object(l.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ee(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function re(e){var t,r,n,c;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,console.log("action",e),t=e.payload.pager,r=e.payload.params,a.next=6,Object(q.d)(g(!0));case 6:return a.next=8,Object(q.b)(Y,r);case 8:return n=a.sent,c=te({},t,{total:parseInt(n.records_filtered)}),a.next=12,Object(q.d)(O(c));case 12:return a.next=14,Object(q.d)(p(n.data));case 14:return a.next=16,Object(q.d)(g(!1));case 16:a.next=23;break;case 18:return a.prev=18,a.t0=a.catch(0),a.next=22,Object(q.d)(g(!1));case 22:console.log("table list refresh error",a.t0);case 23:case"end":return a.stop()}}),Z,null,[[0,18]])}function ne(){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.e)(b.type,re);case 2:case"end":return e.stop()}}),$)}var ce=[Object(q.c)(ne)],ae=M.a.mark(oe);function oe(){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.a)(Object(Q.a)(ce));case 2:case"end":return e.stop()}}),ae)}function ie(){var e=Object(u.a)(),t=Object(i.e)(P,Object(i.a)(e));e.run(oe),Object(a.render)(c.a.createElement(o.a,{store:t},c.a.createElement(G,null)),document.getElementById("root-container"))}function ue(){ie()}r.d(t,"mainModule",(function(){return ie})),r.d(t,"init",(function(){return ue}))}}]);
//# sourceMappingURL=4.938a10a7.chunk.js.map