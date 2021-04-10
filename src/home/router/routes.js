import Layout from '@/home/pages/index.vue'

export default [
    {
        component: Layout,
        path: '/',
        redirect: '/a',
        children: [
            {
                component: () => import('@/home/pages/a.vue'),
                name: 'a',
                path: '/a'
            }
        ]
    }
]
