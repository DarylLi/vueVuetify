<template>
  <div class='tableComponent'>
    <v-data-table no-data-text='' :loading="dataLoaded" :headers="headers" :items="desserts" :pagination.sync
='paginationOp' :headers-length='1220' class="elevation-1">
      <template v-slot:items="props">
        <td v-for='item in headers' :class="{'text-xs-left':true,'large_td':item.value=='column_0'}">{{ props.item[item.value] }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props:{
    dataLoaded: {
      type: Boolean,
      default: true
    },
    headers: {
      type: [Array, String]
    },
    desserts: {
      type: [Array, String]
    },
    renderData: {
      type: [Array, String]
    }
  },	
  data: vm => ({
      downloadUrl:'',
      pagination: {},
      fileName: 'table.xls',
      paginationOp:{
        descending: true,
        rowsPerPage: 10,
        sortBy: 'column_0'
      }
  }),
  created() {
    // let sql = {"rows":[{"columnName":"日期","filterType":"eq","values":[],"id":"ecbbd4df-4f8e-42ac-86b7-36a1d72c6d61"},{"columnName":"页面名称","filterType":"eq","values":[],"id":"c4b0e7a6-43b7-4398-a59c-714cd23c9520"},{"columnName":"页面访问次数","filterType":"eq","values":[],"id":"c6049740-d0cd-4883-94fb-0885b4b83d72"},{"columnName":"人均页面访问时长","filterType":"eq","values":[],"id":"4102a3cc-187b-4ab0-8960-a8b265ee132f"},{"columnName":"次均页面访问时长","filterType":"eq","values":[],"id":"ee7f78be-ee4b-4566-b8bf-24317629fc82"},{"columnName":"跳出率","filterType":"eq","values":[],"id":"97c06c8b-ab34-4730-b996-9ab73dedff94"}],"columns":[],"filters":[{"columnName":"日期","filterType":"eq","values":[],"id":"ecbbd4df-4f8e-42ac-86b7-36a1d72c6d61"}],"values":[]}
      // this.renderTable()
  },
  mounted() {
    // console.log('2')
    // this.getDataFromApi()
    //   .then(data => {
    //     this.desserts = data.items
    //     this.totalDesserts = data.total
    //   })
  },
  methods: {
  }
}

</script>
<style type="text/scss" lang="scss">
  .tableComponent{
    margin-bottom:70px;
    .exportOp{
      position:absolute;
      top:200px;
      z-index:1;
      right:45px;
      color:#1e88e5;
      background-color:#fff!important;
      border:1px solid #1e88e5;
    }
    .exportOp.v-btn--active, .exportOp.v-btn:focus, .exportOp.v-btn:hover{
      position:absolute;
    }
  .large_td{
    width:160px;
    display:flex;
    align-items:center;
  }
  .v-progress-linear__background.primary{
    background-color:#1e88e5!important;
    border-color:#1e88e5!important;    
  }
  .v-progress-linear__bar__indeterminate.primary{
    background-color:#1e88e5!important;
    border-color:#1e88e5!important;
  }
}
</style>
