import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Aplicação',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'home',
                title: 'Home',
                translate: 'NAV.DASHBOARD',
                type: 'item',
                icon: 'home',
                url: '/dashboard'
            },
            {
                id: 'users',
                title: 'Usuários',
                translate: 'NAV.USERS',
                type: 'item',
                icon: 'account_box',
                url: '/apps/users',
            },
           
        ]
    },
    {
        id       : 'e-commerce',
        title    : 'E-Commerce',
        translate: 'NAV.ECOMMERCE',
        type     : 'collapsable',
        icon     : 'shopping_cart',
        children : [
            {
                id        : 'products',
                title     : 'Products',
                type      : 'item',
                url       : '/apps/e-commerce/products',
                exactMatch: true
            },
            {
                id        : 'productDetail',
                title     : 'Product Detail',
                type      : 'item',
                url       : '/apps/e-commerce/products/1/printed-dress',
                exactMatch: true
            },
            {
                id        : 'orders',
                title     : 'Orders',
                type      : 'item',
                url       : '/apps/e-commerce/orders',
                exactMatch: true
            },
            {
                id        : 'orderDetail',
                title     : 'Order Detail',
                type      : 'item',
                url       : '/apps/e-commerce/orders/1',
                exactMatch: true
            }
        ]
    },
    {
        id: 'contracts',
        title: 'Contratos',
        translate: 'NAV.CONTRACT',
        type: 'group',
        children: [
            {
                id: 'register',
                title: 'Corporativo',
                translate: 'NAV.REGISTER',
                type: 'collapsable',
                icon: 'menu',
                children: [
                    {
                        id: 'register',
                        title: 'Pré-Cadastros',
                        translate: 'NAV.REGISTERS',
                        type: 'collapsable',
                        children: [
                            {
                                id: 'sector',
                                title: 'Setor Verificação',
                                type: 'item',
                                url: '/apps/corporate/sector',
                                exactMatch: true
                            },
                            {
                                id: 'verification',
                                title: 'Verificaçōes',
                                type: 'item',
                                url: '/apps/corporate/verification',
                                exactMatch: true
                            },
                            // {
                            //     id: 'indicator',
                            //     title: 'Indicadores',
                            //     type: 'item',
                            //     url: '/apps/corporate/indicators',
                            //     exactMatch: true
                            // },
                           
                        ]
                    },
                    {
                        id: 'units',
                        title: 'Unidades',
                        translate: 'NAV.UNITY',
                        type: 'item',
                        url: '/apps/corporate/units',
                        exactMatch: true
                    },
                    {
                        id: 'customers',
                        title: 'Cliente',
                        translate: 'NAV.CUSTOMER',
                        type: 'item',
                        url: '/apps/corporate/customers',
                        exactMatch: true
                    },
                    {
                        id: 'consorcio',
                        title: 'Consórcios',
                        type: 'item',
                        url: '/apps/corporate/consorcio',
                        exactMatch: true
                    },
                   
                    {
                        id: 'plano',
                        title: 'Planos',
                        type: 'item',
                        url: '/apps/corporate/plano',
                        exactMatch: true
                    },
                    {
                        id: 'benefits',
                        title: 'Benefícios',
                        type: 'item',
                        url: '/apps/corporate/benefits',
                        exactMatch: true
                    },
                   
                    
                ]
            },
            {
                id: 'contract',
                translate: 'NAV.CONTRACT',
                title: 'Contratos',
                type: 'collapsable',
                icon: 'settings',
                children: [
                    
                    {
                        id: 'register',
                        title: 'Pré-Cadastros',
                        translate: 'NAV.REGISTERS',
                        type: 'collapsable',
                        children: [
                            {
                                id: 'status',
                                title: 'Status Contrato',
                                translate: 'NAV.STATUS',
                                type: 'item',
                                icon: 'check_box',
                                url: '/apps/contract/status-contract'
                            },
                            {
                                id: 'status-representative',
                                title: 'Status Representantes',
                                translate: 'NAV.STATUS-REPRESENTATIVE',
                                type: 'item',
                                icon: 'check_box',
                                url: '/apps/contract/status-representative'
                            },
                           
                        ]
                    },
                    {
                        id: 'federalle',
                        title: 'Contrato Federalle',
                        translate: 'NAV.FEDERALLE',
                        type: 'item',
                        icon: 'settings',
                        url: '/apps/contract/contracts'
                    },
                    {
                        id: 'representative',
                        title: 'Contrato Representante',
                        translate: 'NAV.REPRESENTATIVE',
                        type: 'item',
                        icon: 'settings',
                        url: '/apps/contract/representative'
                    }
                ],
                
            }
        ]
    },
    
    {
        id: 'financial',
        translate: 'NAV.FINANCIAL',
        title: 'Financeiro',
        type: 'collapsable',
        icon: 'monetization_on',
        children: [
            {
                id: 'register',
                title: 'Pré-Cadastros',
                translate: 'NAV.REGISTERS',
                type: 'collapsable',
                children: [
                    {
                        id: 'banks',
                        title: 'Bancos',
                        type: 'item',
                        icon: 'account_balance',
                        url: '/apps/corporate/banks',
                        exactMatch: true
                    },
                    {
                        id: 'payment',
                        title: 'Forma Pagamento',
                        translate: 'NAV.PAYMENT',
                        type: 'item',
                        icon: 'check_box',
                        url: '/apps/financial/formPayment'
                    },
                    {
                        id: 'indicators',
                        title: 'Indicadores',
                        translate: 'NAV.INDICATOR',
                        type: 'item',
                        icon: 'swap_vert',
                        url: '/apps/financial/indicators'
                    },
                    {
                        id: 'receiptCommissions',
                        title: 'Commisão Recebimento',
                        translate: 'NAV.COMMISSIONS',
                        type: 'item',
                        icon: 'swap_vert',
                        url: '/apps/financial/receiptCommissions'
                    },
                   
                ]
            },
            // {
            //     id: 'federalle',
            //     title: 'Contrato Federalle',
            //     translate: 'NAV.FEDERALLE',
            //     type: 'item',
            //     icon: 'settings',
            //     url: '/apps/contract/federalle'
            // },
            // {
            //     id: 'representative',
            //     title: 'Contrato Representante',
            //     translate: 'NAV.REPRESENTATIVE',
            //     type: 'item',
            //     icon: 'settings',
            //     url: '/apps/contract/representative'
            // }
        ],
        
    }
]
 

