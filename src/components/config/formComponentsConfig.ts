// 布局组件
export const layoutComponentList = [
    {
        type: 'divider',
        label: '分割线',
        icon: 'icon-a-ziyuan13',
        options: {
            width: '100%',
            orientation: 'left',
            dashed: false,
            text: '分割线',
        },
        key: '',
        model: '',
    },
    {
        type: 'card',
        label: '卡片布局',
        title: '卡片',
        icon: 'icon-_kapianzujian',
        options: {},
        list: [],
        key: '',
        model: '',
    },
    {
        type: 'grid',
        label: '栅格布局',
        icon: 'icon-grid',
        columns: [
            {
                span: 12,
                list: [],
            },
            {
                span: 12,
                list: [],
            },
        ],
        options: {
            gutter: 0,
        },
        key: '',
        model: '',
    },
    {
        type: 'collapses',
        label: '折叠面板',
        icon: 'icon-zhediemianban-copy',
        collapses: [
            {
                key: '1',
                label: '折叠面板1',
                list: [],
            },
        ],
        options: { bordered: true, accordion: true },
        key: '',
    },

    {
        type: 'tabs',
        label: '标签页',
        icon: 'icon-m-tabs',
        tabs: [
            {
                key: '1',
                label: 'Tab 1',
                list: [],
            },
        ],
        options: {
            size: 'middle',
            tabPosition: 'top',
            tabsType: 'line',
            centered: false,
        },
        key: '',
    },
    // {
    //     type: 'collapse',
    // },
]

export const basicList = [
    {
        type: 'input', // 表单类型
        label: '输入框', // 标题文字
        // icon: 'icon-input',
        icon: 'icon-input1',
        title: '输入框',
        options: {
            type: 'text',
            width: '100%', // 宽度
            defaultValue: '', // 默认值
            placeholder: '请输入', // 没有输入时，提示文字
            maxLength: 10,
            hidden: false, // 是否隐藏，false显示，true隐藏
            disabled: false, // 是否禁用，false不禁用，true禁用
            bordered: true,
            allowClear: true,
            size: 'middle',
            value: '',
        },
        key: '',
        rules: [
            //验证规则
            {
                required: false, // 必须填写
                message: '必填项',
            },
        ],
        require: true,
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'textarea', // 表单类型
        label: '文本框', // 标题文字
        icon: 'icon-textarea',
        options: {
            width: '100%', // 宽度
            rows: 4,
            maxLength: 10,
            defaultValue: '',
            value: '',
            clearable: false,
            hidden: false, // 是否隐藏，false显示，true隐藏
            disabled: false,
            placeholder: '请输入多行文本',
            bordered: true,
        },
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },

    {
        type: 'select', // 表单类型
        label: '下拉选择器', // 标题文字
        icon: 'icon-xiala',
        options: {
            width: '100%', // 宽度
            defaultValue: undefined, // 下拉选框请使用undefined为默认值
            mode: undefined, // 是否允许多选
            size: 'middle',
            disabled: false, // 是否禁用
            clearable: false, // 是否显示清除按钮
            bordered: true,
            hidden: false, // 是否隐藏，false显示，true隐藏
            placeholder: '请选择', // 默认提示文字
            dynamicKey: '',
            dynamicParam: '',
            dynamic: false,
            dynamicUrl: '', //获取外部数据接口url
            dynamicType: {},
            combineHandle: false, //可联动操作
            value: '1',
            option: [
                // 下拉选择项配置
                {
                    value: '1',
                    label: '下拉框1',
                },
                {
                    value: '2',
                    label: '下拉框2',
                },
            ],
            showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字
        },
        model: '',
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'number', // 表单类型
        label: '数字输入框', // 标题文字
        icon: 'icon-input-number',
        options: {
            width: '100%', // 宽度
            defaultValue: 0, // 默认值
            value: 0,
            min: -999, // 可输入最小值
            max: 999, // 可输入最大值
            precision: null,
            step: 1, // 步长，点击加减按钮时候，加减多少
            hidden: false, // 是否隐藏，false显示，true隐藏t
            disabled: false, //是否禁用
            // placeholder: '请输入',
            size: 'default',
        },
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'checkbox',
        label: '多选',
        icon: 'icon-checkbox-multiple-ma',
        options: {
            width: '100%',
            disabled: false, //是否禁用
            hidden: false, // 是否隐藏，false显示，true隐藏
            defaultValue: [],
            value: ['1', '3'],
            dynamicKey: '',
            dynamic: false,
            combineHandle: false, //可联动操作
            option: [
                {
                    value: '1',
                    label: '选项1',
                },
                {
                    value: '2',
                    label: '选项2',
                },
                {
                    value: '3',
                    label: '选项3',
                },
            ],
        },
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'radio', // 表单类型
        label: '单选', // 标题文字
        icon: 'icon-danxuan_xuanzhong',
        options: {
            disabled: false, //是否禁用
            hidden: false, // 是否隐藏，false显示，true隐藏
            defaultValue: '', // 默认值
            dynamicKey: '',
            dynamic: false,
            combineHandle: false, //可联动操作
            optionType: 'default',
            value: '1',
            width: '100%',
            option: [
                {
                    value: '1',
                    label: '选项1',
                },
                {
                    value: '2',
                    label: '选项2',
                },
                {
                    value: '3',
                    label: '选项3',
                },
            ],
        },
        model: '',
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'date', // 表单类型
        label: '日期选择', // 标题文字
        icon: 'icon-riqi',
        options: {
            width: '100%', // 宽度
            defaultValue: '2023-12-01', // 默认值，字符串 12:00:00
            rangeDefaultValue: [], // 默认值，字符串 12:00:00
            range: false, // 范围日期选择，为true则会显示两个时间选择框（同时defaultValue和placeholder要改成数组），
            showTime: false, // 是否显示时间选择器
            disabled: false, // 是否禁用
            hidden: false, // 是否隐藏，false显示，true隐藏
            clearable: false, // 是否显示清除按钮
            picker: 'date',
            placeholder: '请选择',
            rangePlaceholder: ['开始时间', '结束时间'],
            format: 'YYYY-MM-DD', // 展示格式  （请按照这个规则写 YYYY-MM-DD HH:mm:ss，区分大小写）
            bordered: true,
            value: '2023-12-11',
        },
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'time', // 表单类型
        label: '时间选择框', // 标题文字
        icon: 'icon-shijianxuanze',
        options: {
            width: '100%', // 宽度
            defaultValue: '', // 默认值，字符串 12:00:00
            disabled: false, // 是否禁用
            hidden: false, // 是否隐藏，false显示，true隐藏
            clearable: false, // 是否显示清除按钮
            placeholder: '请选择',
            format: 'HH:mm:ss', // 展示格式
            value: '12:00:00',
            bordered: true,
        },
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'rate', // 表单类型
        label: '评分', // 标题文字
        icon: 'icon-score',
        options: {
            defaultValue: 0,
            count: 5, // 最大值
            disabled: false, // 是否禁用
            hidden: false, // 是否隐藏，false显示，true隐藏
            allowHalf: false, // 是否允许半选
            value: 0,
            width: '100%',
        },
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'slider', // 表单类型
        label: '滑动输入条', // 标题文字
        icon: 'icon-slider',
        options: {
            width: '100%', // 宽度
            defaultValue: 0, // 默认值， 如果range为true的时候，则需要改成数组,如：[12,15]
            disabled: false, // 是否禁用
            hidden: false, // 是否隐藏，false显示，true隐藏
            min: 0, // 最小值
            max: 100, // 最大值
            step: 1, // 步长，取值必须大于 0，并且可被 (max - min) 整除
            showInput: false, // 是否显示输入框，range为true时，请勿开启
            value: 0,
        },
        model: '',
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
    },

    {
        type: 'uploadFile', // 表单类型
        label: '上传文件', // 标题文字
        icon: 'icon-yunduanshangchuan',
        options: {
            defaultValue: '',
            multiple: false,
            disabled: false,
            hidden: false, // 是否隐藏，false显示，true隐藏
            drag: false,
            downloadWay: 'a',
            dynamicFun: '',
            width: '100%',
            data: '{}',
            name: 'file',
            maxCount: 3,
            directory: false, // 是否支持上传文件夹
            headers: {},
            action: '/api/upload',
            placeholder: '上传',
            listType: 'text',
        },
        model: '',
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'treeSelect', // 表单类型
        label: '树选择器', // 标题文字
        icon: 'icon-tree-select1',
        options: {
            disabled: false, //是否禁用
            bordered: true,
            defaultValue: undefined, // 默认值
            multiple: false,
            hidden: false, // 是否隐藏，false显示，true隐藏
            clearable: false, // 是否显示清除按钮
            showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字
            treeCheckable: false,
            treeSingleCheck: false, //只能勾选子节点
            treeSingleCheckable: false,
            placeholder: '请选择',
            treeDefaultExpandAll: true,
            dynamicKey: '',
            dynamic: true,
            data: [
                {
                    value: '1',
                    label: '选项1',
                    children: [
                        {
                            value: '11',
                            label: '选项1-1',
                        },
                    ],
                },
                {
                    value: '2',
                    label: '选项2',
                    children: [
                        {
                            value: '21',
                            label: '选项2-1',
                        },
                    ],
                },
            ],
        },
        model: '',
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'cascader', // 表单类型
        label: '级联选择器', // 标题文字
        icon: 'icon-jilianxuanze',
        options: {
            width: '100%',
            disabled: false, //是否禁用
            hidden: false, // 是否隐藏，false显示，true隐藏
            defaultValue: undefined, // 默认值
            showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字
            placeholder: '请选择',
            bordered: true,
            clearable: false, // 是否显示清除按钮
            dynamicKey: '',
            dynamic: true,
            // value:['1'],
            data: [
                {
                    value: '1',
                    label: '选项1',
                    children: [
                        {
                            value: '11',
                            label: '选项1-1',
                        },
                    ],
                },
                {
                    value: '2',
                    label: '选项2',
                    children: [
                        {
                            value: '22',
                            label: '选项2-1',
                        },
                    ],
                },
            ],
            size: 'default',
        },
        model: '',
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
        unique: false,
        is_inherited: false,
        is_auth: false,
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    // {
    //     type: 'batch',
    //     label: '动态表格',
    //     icon: 'icon-dongtaibiaoge',
    //     list: [],
    //     options: {
    //         scrollY: 0,
    //         disabled: false,
    //         hidden: false, // 是否隐藏，false显示，true隐藏
    //         showLabel: false,
    //         hideSequence: false,
    //         width: '100%',
    //     },
    //     model: '',
    //     key: '',
    //     is_inherited: false,
    //     is_combine: false, //可被联动操作
    //     combine_item: '', //联动操作对应字段
    // },
    // {
    //     type: 'editor',
    //     label: '富文本',
    //     icon: 'icon-fuwenbenkuang',
    //     options: {
    //         height: 300,
    //         placeholder: '请输入',
    //         defaultValue: '',
    //         chinesization: true,
    //         hidden: false, // 是否隐藏，false显示，true隐藏
    //         disabled: false,
    //         showLabel: false,
    //         width: '100%',
    //     },
    //     model: '',
    //     key: '',
    //     rules: [
    //         {
    //             required: false,
    //             message: '必填项',
    //         },
    //     ],
    //     is_combine: false, //可被联动操作
    //     combine_item: '', //联动操作对应字段
    // },
    {
        type: 'switch', // 表单类型
        label: '开关', // 标题文字
        icon: 'icon-gongyezujian-kaiguan',
        options: {
            defaultValue: false, // 默认值 Boolean 类型
            hidden: false, // 是否隐藏，false显示，true隐藏
            disabled: false, // 是否禁用
            size: 'default',
            value: false,
        },
        key: '',
        rules: [
            {
                required: false,
                message: '必填项',
            },
        ],
    },
    {
        type: 'button', // 表单类型
        label: '按钮', // 标题文字
        icon: 'icon-slmp-AButton____anniu',
        options: {
            placeholder: '按钮',
            buttonType: 'primary',
            shape: 'default',
            handle: 'submit',
            dynamicFun: '',
            hidden: false, // 是否隐藏，false显示，true隐藏
            disabled: false, // 是否禁用，false不禁用，true禁用
            size: 'middle',
            danger: false,
            ghost: false,
        },
        key: '',
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'alert',
        label: '警告提示',
        icon: 'icon-jinggao1',
        options: {
            alertType: 'success',
            description: '提示信息',
            showIcon: false,
            banner: false,
            hidden: false, // 是否隐藏，false显示，true隐藏
            closable: false,
        },
        key: '',
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'text',
        label: '文字',
        icon: 'icon-Text',
        options: {
            textAlign: 'left',
            hidden: false, // 是否隐藏，false显示，true隐藏
            showRequiredMark: false,
            value: '文字',
        },
        key: '',
        is_combine: false, //可被联动操作
        combine_item: '', //联动操作对应字段
    },
    {
        type: 'html',
        label: 'HTML',
        icon: 'icon-html',
        options: {
            hidden: false, // 是否隐藏，false显示，true隐藏
            value: '<strong>HTML</strong>',
        },
        key: '',
    },
    // {
    //     type: 'table',
    //     label: '表格',
    //     icon: 'icon-table',
    //     rows: {
    //         columns: [
    //             {
    //                 title: 'Name',
    //                 dataIndex: 'name',
    //                 key: 'name',
    //             },
    //             {
    //                 title: 'Age',
    //                 dataIndex: 'age',
    //                 key: 'age',
    //             },
    //             {
    //                 title: 'Address',
    //                 dataIndex: 'address',
    //                 key: 'address',
    //             },
    //         ],
    //         data: [
    //             {
    //                 key: '1',
    //                 name: 'John Brown',
    //                 age: 32,
    //                 address: 'New York No. 1 Lake Park',
    //             },
    //             {
    //                 key: '2',
    //                 name: 'Jim Green',
    //                 age: 42,
    //                 address: 'London No. 1 Lake Park',
    //             },
    //             {
    //                 key: '3',
    //                 name: 'Joe Black',
    //                 age: 32,
    //                 address: 'Sydney No. 1 Lake Park',
    //             },
    //         ],
    //     },
    //     options: {
    //         width: '100%',
    //         bordered: true,
    //         bright: false,
    //         small: true,
    //         customStyle: {},
    //     },
    //     key: '',
    //     model: '',
    // },
]
