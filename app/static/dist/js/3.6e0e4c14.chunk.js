(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[3],{430:function(e,t,r){},432:function(e,t,r){"use strict";r.r(t);var n={};r.r(n),r.d(n,"setTableList",(function(){return d})),r.d(n,"refreshTableList",(function(){return b})),r.d(n,"setPager",(function(){return O})),r.d(n,"setSort",(function(){return g})),r.d(n,"setSearchFilter",(function(){return m})),r.d(n,"setTableFilter",(function(){return y})),r.d(n,"setTableListLoading",(function(){return j})),r.d(n,"setUserData",(function(){return h})),r.d(n,"setModal",(function(){return v}));var a=r(1),o=r.n(a),c=r(8),i=r(407),l=r(80),s=r(416),u=r(405),p=r(410),f=r(408),d=Object(f.a)("SET_TABLE_LIST",(function(e){return function(t){return e({table_list:t})}})),b=Object(f.a)("REFRESH_TABLE_LIST",(function(e){return function(t,r){return e({pager:t,params:r})}})),O=Object(f.a)("SET_PAGER",(function(e){return function(t){return e({pager:t})}})),g=Object(f.a)("SET_SORT",(function(e){return function(t){return e({sort:t})}})),m=Object(f.a)("SET_SEARCH_FILTER",(function(e){return function(t){return e({filter:t})}})),y=Object(f.a)("SET_TABLE_FILTER",(function(e){return function(t){return e({filter:t})}})),j=Object(f.a)("SET_TABLE_LIST_LOADING",(function(e){return function(t){return e({loading:t})}})),h=Object(f.a)("SET_USER_DATA",(function(e){return function(t,r){return e({username:t,age:r})}})),v=Object(f.a)("[APP]SET_MODAL",(function(e){return function(t){return e({data:t})}}));function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(r,!0).forEach((function(t){Object(u.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var S={created_at:{name:"create_time",dir:"desc"}},_={data:[],loading:!1,pager:{current:1,pageSize:10,pageSizeOptions:["10","20","50","100","1000"],showSizeChanger:!0,showQuickJumper:!0,showTotal:function(e){return"Total:".concat(e)}},search_filter:{},table_filter:{},sort:S},P=Object(p.a)({table:_,modal:{visible:0,type:"input"}}),L=Object(f.b)(P,(function(e){return[e(d,(function(e,t){var r=t.payload;return e.setIn(["table","data"],Object(p.a)(r.table_list))})),e(O,(function(e,t){var r=t.payload,n=e.setIn(["table","pager"],Object(p.a)(r.pager));return console.log("handle pager reducer",n.getIn(["table","pager"]).toJS()),n})),e(g,(function(e,t){var r=t.payload;return console.log("===sort",r.sort),e.setIn(["table","sort"],Object(p.a)(r.sort))})),e(m,(function(e,t){var r=t.payload;return e.setIn(["table","search_filter"],Object(p.a)(r.filter))})),e(y,(function(e,t){var r=t.payload;return e.setIn(["table","table_filter"],Object(p.a)(r.filter))})),e(j,(function(e,t){var r=t.payload;return e.setIn(["table","loading"],r.loading)})),e(h,(function(e,t){var r=t.payload,n=E({},e.toJS(),{},r);return Object(p.a)(n)})),e(v,(function(e,t){var r=t.payload,n=E({},e.get("modal").toJS(),{},r.data);return e.setIn(["modal"],Object(p.a)(n))}))]})),I=Object(l.c)({orderList:L}),T=r(420),k=r(421),D=r(422),x=r(428),J=r(45),C=r(423),z=r(411);function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var R=function(e){return e.orderList.getIn(["table","data"])},U=function(e){return e.orderList.getIn(["table","pager"])},N=function(e){return e.orderList.getIn(["table","loading"])},B=function(e){return e.orderList.getIn(["modal"])},F=Object(z.a)([function(e){return e.orderList.getIn(["table","search_filter"])},function(e){return e.orderList.getIn(["table","table_filter"])}],(function(e,t){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(r,!0).forEach((function(t){Object(u.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e.toJS(),{},t.toJS())})),H=(Object(z.a)([U,F,function(e){return e.orderList.getIn(["table","sort"])}],(function(e,t,r){return{current:e.get("current"),pageSize:e.get("pageSize"),sort:r.toJS(),filter:t}})),r(412)),M=r(413),K=r(417),G=r(414),Q=r(418),q=r(425),V=r(427),W=r(10),X=r(426),Y=r(424);q.a.Item;window.r=V.a;var Z=window.g,$="".concat(Z.baseUrl,"upload"),ee=function(e){function t(e){var r;return Object(H.a)(this,t),(r=Object(K.a)(this,Object(G.a)(t).call(this,e))).okHandle=function(){r.props.dispatch(r.props.actions.setModal({visible:0})),r.setState({fileList:[]})},r.state={uploading:!1,fileList:[],downloadName:"",downloadUrl:"",repeated:[]},r}return Object(Q.a)(t,e),Object(M.a)(t,[{key:"render",value:function(){var e=this,t=this.props.modalData.get("type"),r={name:"file",data:{type:t},action:$,beforeUpload:function(t,r){return e.setState({uploading:!0,fileList:[t]}),!0},onChange:function(r){if("uploading"!==r.file.status&&console.log(r.file,r.fileList),"done"===r.file.status){var n=r.file.response;n&&"error"===n.status?V.a.error("".concat(r.file.name," ").concat(n.msg)):("handle"===t?e.setState({downloadName:n.name,downloadUrl:n.url,repeated:n.repeated}):e.props.fetchTableList(),V.a.success("".concat(r.file.name," \u6587\u4ef6\u4e0a\u4f20\u6210\u529f")))}else"error"===r.file.status&&V.a.error("".concat(r.file.name," \u6587\u4ef6\u4e0a\u4f20\u5931\u8d25"));e.setState({uploading:!1})},fileList:this.state.fileList},n=o.a.createElement(W.a,{type:"upload"});this.state.uploading&&(n=o.a.createElement(W.a,{type:"sync",theme:"twoTone",twoToneColor:"#52c41a",spin:!0}));var a="",c="";return"handle"===this.props.modalData.get("type")&&(a=o.a.createElement("div",{style:{margin:"20px 0 20px 0"}},"\u53f3\u952e\u4e0b\u8f7d\u5904\u7406\u540e\u6587\u4ef6: ",o.a.createElement("a",{href:this.state.downloadUrl},this.state.downloadName)),c=o.a.createElement("ul",null,o.a.createElement("li",null,"\u91cd\u590d\u8ba2\u5355\u4fe1\u606f\uff1a"),this.state.repeated.map((function(e){return o.a.createElement("li",null,e.receiver_name," : ",e.receiver_cellphone)})))),o.a.createElement(X.a,{title:"input"==this.props.modalData.get("type")?"\u8f93\u5165\u8ba2\u5355":"\u5904\u7406\u8ba2\u5355",width:"800px",visible:!!this.props.modalData.get("visible"),destroyOnClose:!0,maskClosable:!1,onOk:function(){return e.okHandle()},onCancel:function(){e.props.dispatch(e.props.actions.setModal({visible:0})),e.setState({fileList:[]})},confirmLoading:!1},o.a.createElement(Y.a,r,o.a.createElement(J.a,null,n," \u9009\u62e9\u6587\u4ef6")),a,c)}}]),t}(o.a.Component),te=q.a.create()(ee);function re(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ne(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?re(r,!0).forEach((function(t){Object(u.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):re(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var ae=T.a.Content,oe=function(e){var t=Object(i.c)(R),r=Object(i.c)(U),c=Object(i.c)(N),l=Object(i.c)(B),s=Object(i.d)(),u=Object(i.b)(),p=function(){var e=s.getState().orderList.get("table").toJS(),t={current:e.pager.current,pageSize:e.pager.pageSize,sort:e.sort,filter:ne({},e.search_filter,{},e.table_filter)};u(b(e.pager,t))};return Object(a.useEffect)((function(){p()}),[]),o.a.createElement(T.a,{className:"layout",style:{background:"white"}},o.a.createElement(k.a,null,o.a.createElement(D.a,{span:24},o.a.createElement(ae,null,o.a.createElement(x.a,null,o.a.createElement(x.a.Item,null,"Home")),o.a.createElement("div",null,o.a.createElement("div",{className:"clearfix",style:{margin:"10px 0"}},o.a.createElement(J.a,{onClick:function(e){u(v({visible:1,type:"input"}))},icon:"upload",type:"primary",size:"small"},"\u4e0a\u4f20\u8ba2\u5355"),o.a.createElement(J.a,{icon:"thunderbolt",type:"primary",onClick:function(e){u(v({visible:1,type:"handle"}))},size:"small",style:{marginLeft:"15px"}},"\u5904\u7406\u8ba2\u5355")),o.a.createElement(C.a,{dataSource:t.toJS(),columns:[{title:"ID",dataIndex:"id",key:"id",sorter:!0,width:60},{title:"\u8ba2\u5355\u53f7",dataIndex:"order_id",key:"order_id"},{title:"\u6536\u8d27\u4eba",dataIndex:"receiver_name",key:"receiver_name"},{title:"\u7535\u8bdd",dataIndex:"receiver_cellphone",key:"receiver_cellphone"},{title:"\u6536\u8d27\u5730\u5740",dataIndex:"receiver_address",key:"receiver_address"},{title:"\u5feb\u9012\u516c\u53f8",dataIndex:"logistic_company_name",key:"logistic_company_name"},{title:"\u8fd0\u5355\u53f7",dataIndex:"logistic_bill_number",key:"logistic_bill_number"},{title:"\u4e0b\u5355\u65f6\u95f4",dataIndex:"create_time",key:"create_time",sorter:!0,width:150}],loading:c,pagination:r.toJS(),onChange:function(e,t,r){var n=ne({},s.getState().orderList.get("table").toJS().pager,{current:e.current,pageSize:e.pageSize}),a=n.current,o={},c=!1;if("undefined"!=typeof r.columnKey){var i=r.columnKey,l="ascend"==r.order?"asc":"desc";o[i]={name:i,dir:l},c=!0}o=c?o:S,n.current=a,u(O(n)),u(g(o)),setTimeout((function(){p()}),0)},size:"small",bordered:!0,rowKey:"id"})),o.a.createElement(te,{actions:n,dispatch:u,fetchTableList:p,modalData:l})))))},ce=(r(430),function(e){return o.a.createElement(oe,null)}),ie=r(406),le=r.n(ie),se=r(415),ue=r(409);function pe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var fe={Accept:"application/json","Content-Type":"application/json"},de=window.g;function be(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t="".concat(de.baseUrl,"tb-order-list"),r=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?pe(r,!0).forEach((function(t){Object(u.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):pe(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},{},{},e),n=!1;return new Promise((function(e,a){fetch(t,{method:"post",headers:fe,credentials:"same-origin",body:JSON.stringify(r)}).then((function(e){return n=e.ok,e.ok,e.json()})).then((function(t){n?e(t):a(t)})).catch((function(e){a(e)}))}))}var Oe=le.a.mark(je),ge=le.a.mark(he);function me(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ye(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?me(r,!0).forEach((function(t){Object(u.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):me(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function je(e){var t,r,n,a;return le.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,console.log("action",e),t=e.payload.pager,r=e.payload.params,o.next=6,Object(ue.d)(j(!0));case 6:return o.next=8,Object(ue.b)(be,r);case 8:return n=o.sent,a=ye({},t,{total:parseInt(n.records_filtered)}),o.next=12,Object(ue.d)(O(a));case 12:return o.next=14,Object(ue.d)(d(n.data));case 14:return o.next=16,Object(ue.d)(j(!1));case 16:o.next=23;break;case 18:return o.prev=18,o.t0=o.catch(0),o.next=22,Object(ue.d)(j(!1));case 22:console.log("table list refresh error",o.t0);case 23:case"end":return o.stop()}}),Oe,null,[[0,18]])}function he(){return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ue.e)(b.type,je);case 2:case"end":return e.stop()}}),ge)}var ve=[Object(ue.c)(he)],we=le.a.mark(Ee);function Ee(){return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ue.a)(Object(se.a)(ve));case 2:case"end":return e.stop()}}),we)}function Se(){var e=Object(s.a)(),t=Object(l.e)(I,Object(l.a)(e));e.run(Ee),window.store=t,Object(c.render)(o.a.createElement(i.a,{store:t},o.a.createElement(ce,null)),document.getElementById("root-container"))}function _e(){Se()}r.d(t,"mainModule",(function(){return Se})),r.d(t,"init",(function(){return _e}))}}]);
//# sourceMappingURL=3.6e0e4c14.chunk.js.map