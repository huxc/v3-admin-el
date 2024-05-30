import Layout from '@/layouts/index.vue'

export default {
    "path": "/menu",
    "name": "menu",
    "redirect": "/menu/menu1",
    component: markRaw(Layout),
    "meta": {
        "icon": "menu",
        "title": "菜单嵌套",
        "isHide": false,
        "keepAlive": true
    },
    "children": [
        {
            "path": "/menu/menu1",
            "name": "menu1",
            "component":() => import('@/views/menu/menu1/index.vue'),
            "meta": {
                "icon": "menu",
                "title": "菜单1",
                "isHide": false,
                "keepAlive": true
            }
        },
        {
            "path": "/menu/menu2",
            "name": "menu2",
            "redirect": "/menu/menu2/menu21",
            "meta": {
                "icon": "menu",
                "title": "菜单2",
                "isHide": false,
                "keepAlive": true
            },
            "children": [
                {
                    "path": "/menu/menu2/menu21",
                    "name": "menu21",
                    "component": () => import('@/views/menu/menu2/menu21/index.vue'),
                    "meta": {
                        "icon": "menu",
                        "title": "菜单2-1",
                        "isHide": false,
                        "keepAlive": true
                    }
                },
                {
                    "path": "/menu/menu2/menu22",
                    "name": "menu22",
                    "redirect": "/menu/menu2/menu22/menu221",
                    "meta": {
                        "icon": "menu",
                        "title": "菜单2-2",
                        "isHide": false,
                        "keepAlive": true
                    },
                    "children": [
                        {
                            "path": "/menu/menu2/menu22/menu221",
                            "name": "menu221",
                            "component": () => import('@/views/menu/menu2/menu22/menu221/index.vue'),
                            "meta": {
                                "icon": "menu",
                                "title": "菜单2-2-1",
                                "isHide": false,
                                "keepAlive": true
                            }
                        },
                        {
                            "path": "/menu/menu2/menu22/menu222",
                            "name": "menu222",
                            "component": () => import('@/views/menu/menu2/menu22/menu222/index.vue'),
                            "meta": {
                                "icon": "menu",
                                "title": "菜单2-2-2",
                                "isHide": false,
                                "keepAlive": true
                            }
                        }
                    ]
                },
                {
                    "path": "/menu/menu2/menu23",
                    "name": "menu23",
                    "component": () => import('@/views/menu/menu2/menu23/index.vue'),
                    "meta": {
                        "icon": "menu",
                        "title": "菜单2-3",
                        "isHide": false,
                        "keepAlive": true
                    }
                }
            ]
        },
        {
            "path": "/menu/menu3",
            "name": "menu3",
            "component": () => import('@/views/menu/menu3/index.vue'),
            "meta": {
                "icon": "menu",
                "title": "菜单3",
                "isHide": false,
                "keepAlive": true
            }
        }
    ]
}