<template>
  <div>
    <div class="title">产品信息</div>
    <a-form :form="form">
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="商品id">
        <a-input v-decorator="rules.id" placeholder="商品id"/>
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="商品名称">
        <a-input v-decorator="rules.name" placeholder="商品名称"/>
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="品类">
        <a-select v-decorator="rules.category" placeholder="品类" :options="categorys" labelInValue></a-select>
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="型号">
        <a-input v-decorator="rules.type" placeholder="型号"/>
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="功能入口">
        <a-input v-decorator="rules.entrance" placeholder="功能入口"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" @click="onSave">
          保存
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style>
  .title {
    background: #fff;
    text-align: left;
    padding: 16px 13px;
    color: #5A5F65;
  }
</style>

<script>
  import { Form,Input,Select,Button} from 'ant-design-vue';
  import 'ant-design-vue/dist/antd.css';
  const {Item} = Form
  const { Option } = Select

export default {
  name: 'editProduct',
  components: {
    AForm:Form,
    AInput:Input,
    AFormItem:Item,
    ASelect:Select,
    ASelectOption:Option,
    AButton: Button,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout:{
        labelCol: { span: 5},
        wrapperCol: { span: 10},
        editerWrapperCol: { span: 17},
        spewrapperCol: { span: 24, }
      },
      categorys: [
        {key: 1, label: '电磁炉'},
        {key: 2, label: '电饭煲'},
      ],
      rules:{
        id:[
          'id',
          {
            rules: [
              { required: true, message: '商品id' },
            ],
          }
        ],
        name:[
          'name',
          {
            rules: [
              { required: true, message: '商品名称' },
            ],
          }
        ],
        category:[
          'category',
          {
            rules: [
              { required: true, message: '品类' },
            ],
          }
        ],
        type:[
          'type',
          {
            rules: [
              { required: true, message: '型号' },
            ],
          }
        ],
        entrance:[
          'entrance',
          {
            rules: [
              { required: true, message: '功能入口' },
            ],
          }
        ],
      },
    }
  },
  computed: {
    productVo: function(){
      var vo = this.$store.state.editVo;
      if(!vo || !vo.id){
        vo=JSON.parse(localStorage.getItem("itemvo"))
        this.$store.commit('setEditVo', vo);
      }
      return vo;
    },
  },
  mounted() {
    let vo = this.productVo;
    let cateId = vo.category;
    let obj = this.categorys.filter(function(item){
      if (item.key == cateId) {
        return true;
      }
    })[0];

    this.form.setFieldsValue({
      id: vo.id,
      name: vo.name,
      // category: vo.category + '',
      category: obj,
      type: vo.type,
      entrance: vo.entrance
    });
    console.log(vo)
  },
  methods: {
    onSave(){
      let _this = this;
      _this.form.validateFields((err, values) => {
        let category = values.category.key;
        values.category = category;
        console.log(values)
        _this.$router.push({ name: 'Home',query: { vo: values }});
      });
    }
  },
}
</script>
