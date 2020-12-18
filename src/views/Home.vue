<template>
  <!--<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>-->
  <div class="content">
    <div class="title">产品管理</div>

    <div class="table">
      <div class="searchDiv">
<!--        <a-select class="select" placeholder="全部品类" :options="categorys" labelInValue @select="change" v-model="selectKey"></a-select>-->
        <a-select class="select" placeholder="全部品类" :options="categorys" labelInValue v-model="selectKey"></a-select>
        <a-input class="search" placeholder="搜索"/>
      </div>
      <a-table rowKey="id" :columns="columns" :dataSource="listdataVis" bordered :pagination="pagination" :loading="loading" :locale="locale">
        <!--渲染器-->
        <span slot="category" slot-scope="text, record">
          <span>{{record.category=="1"?"电磁炉": ""}}</span>
          <span>{{record.category=="2"?"电饭煲": ""}}</span>
        </span>
        <span slot="name" slot-scope="text, record">
          <a-tooltip placement="bottom" :title="{text}">
            <div class="productName">{{text}}</div>
          </a-tooltip>
        </span>
        <span slot="action" slot-scope="text, record">
          <a-tooltip placement="top" title="查看">
            <img src="../assets/view.png" class="icon"/>
          </a-tooltip>
          <a-tooltip placement="top" title="编辑" >
            <a-icon class="delicon icon" type="edit" @click="editProduct(record)"/><!-- 编辑 -->
          </a-tooltip>
          <a-popconfirm title="确定删除当前数据？" @confirm="handleDelete(record.id)" okText="是" cancelText="否">
            <a-tooltip placement="top" title="删除">
              <a-icon class="delicon icon" type="delete"/><!-- 删除 -->
            </a-tooltip>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
  </div>
</template>

<style>
  .content {
    background: #EDF1F5;
    width: 100%;
    height: 100%;
  }
  .title {
    background: #fff;
    text-align: left;
    padding: 16px 13px;
    color: #5A5F65;
  }
  .table {
    margin: 16px;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 6px;
    color: #5A5F65;
  }
  tbody {
    color: #889199;
  }
  th, td {
    padding: 15px 0;
    font-weight: normal;
  }
  tr {
    background: #fff;
  }
  .icon {
    color: #91989F;
    margin-right: 10px;
  }
  .productName {
    color: #51A9C2;
    cursor: pointer;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .searchDiv{
    background: #fff;
    text-align: right;
    padding: 8px 16px;
  }
  .select{
    width: 120px;
    margin-right: 10px;
  }
  .search{
    width: 200px;
    height: 30px;
  }
</style>

<script>
  import { Tooltip, Table, Icon, Popconfirm, Input, Select } from 'ant-design-vue';
  import 'ant-design-vue/dist/antd.css';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    ATooltip: Tooltip,
    ATable: Table,
    AIcon: Icon,
    APopconfirm: Popconfirm,
    AInput: Input,
    ASelect: Select,
  },
  data() {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: '10%'
        },
        {
          title: '产品名称',
          dataIndex: 'name',
          width: '30%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '品类',
          dataIndex: 'category',
          width: '15%',
          scopedSlots: { customRender: 'category' }
        },
        {
          title: '型号',
          dataIndex: 'type',
          width: '20%'
        },
        {
          title: '功能入口',
          dataIndex: 'entrance',
          width: '10%'
        },
        {
          title: '操作',
          dataIndex: 'ID',
          width: '15%',
          scopedSlots: { customRender: 'action' }
        }
      ],
      listdata: [
        { id: '001', name: '苏泊尔（SUPOR）电磁炉纤薄均匀火爆电磁灶sssssssssssssssssssssssss', category: 1, type: 'CY001', entrance: 1 },
        { id: '002', name: '1H电饭煲', category: 2, type: 'CY002', entrance: 2 },
        { id: '003', name: '苏泊尔电磁炉', category: 1, type: 'CY003', entrance: 3 },
        { id: '004', name: '苏泊尔（SUPOR）电磁炉纤薄均匀火爆电磁灶sssssssssssssssssssssssss', category: 1, type: 'CY001', entrance: 1 },
        { id: '005', name: '1H电饭煲', category: 2, type: 'CY002', entrance: 2 },
        { id: '006', name: '苏泊尔电磁炉', category: 1, type: 'CY003', entrance: 3 },
        { id: '007', name: '苏泊尔（SUPOR）电磁炉纤薄均匀火爆电磁灶sssssssssssssssssssssssss', category: 1, type: 'CY001', entrance: 1 },
        { id: '008', name: '1H电饭煲', category: 2, type: 'CY002', entrance: 2 },
        { id: '009', name: '苏泊尔电磁炉', category: 1, type: 'CY003', entrance: 3 },
        { id: '0010', name: '苏泊尔（SUPOR）电磁炉纤薄均匀火爆电磁灶sssssssssssssssssssssssss', category: 1, type: 'CY001', entrance: 1 },
        { id: '0011', name: '1H电饭煲', category: 2, type: 'CY002', entrance: 2 },
        { id: '0012', name: '苏泊尔电磁炉', category: 1, type: 'CY003', entrance: 3 },
      ],
      pagination: {},
      loading: false,
      locale:{ //默认文案设置
        emptyText: '暂无数据'
      },
      categorys: [
        {key: 0, label: '全部品类'},
        {key: 1, label: '电磁炉'},
        {key: 2, label: '电饭煲'},
      ],
      selectKey: {key: 0, label: '全部品类'},
    }
  },
  created () {
    if (this.$route.query.vo) {
      let vo = this.$route.query.vo;
      let data = this.listdata;
      for (let i=0; i<data.length; i++) {
        if (data[i].id === vo.id) {
          data[i] = vo;
          break;
        }
      }
    }
  },
  computed: {
    listdataVis: function() {
      if (this.selectKey.key === 0) {
        return this.listdata;
      } else {
        return this.listdata.filter(item => {
          return item.category === this.selectKey.key;
        });
      }
    }
  },
  methods: {
    // 删除
    handleDelete(id) {
      let _this = this;
      _this.listdata.forEach((item, index) => {
        if (item.id == id) {
          _this.listdata.splice(index, 1);
        }
      })
    },
    // 修改
    editProduct(vo){
      this.$store.commit('setEditVo', vo);
      this.$router.push({ name: 'editProduct' });
    },
    /*change(e) {
      if (e.key === 0) {
        this.listdataVis = this.listdata;
      } else {
        this.listdataVis = this.listdata.filter(item => {
          return item.category === e.key;
        });
      }
    },*/
  },
}
</script>
