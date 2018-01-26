const routers = [{
    path: '/',
    meta: {
        title: '数据管理'
    },
    component: (resolve) => require(['./views/index/index.vue'], resolve)
}];

export default routers;
