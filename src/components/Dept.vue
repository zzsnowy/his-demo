<template>
  <el-container style="height: 500px; border: 1px solid #eee">
<el-header style="text-align: center; font-size: 12px;">
       <el-row>
         <el-col :span="5">
           <el-input v-model="keywords" size="medium" placeholder="部门代码|部门名"/>
         </el-col> 
         <el-col :span="19" style="text-align:left;padding-left:10px">  
           <el-button type="success" size="medium" icon="el-icon-search" @click="selectDeptByName">查询</el-button>
         </el-col>
       </el-row>
     </el-header>
     <el-main>
       <div style="text-align:left">
         <el-button type="warning" icon="el-icon-folder-add" @click="dialogVisible = true">新增科室</el-button>
       </div>
           <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              highlight-current-row
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="编号"
                width="100">
                <template slot-scope="scope">{{ scope.row.id }}</template>
              </el-table-column>
              <el-table-column
                prop="deptcode"
                label="部门代码"
                width="200">
              </el-table-column>
              <el-table-column
                prop="deptname"
                label="部门名"
                width="250">
              </el-table-column>
              <el-table-column
                prop="deptcategoryid"
                label="部门仓库id"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
     </el-main>
     <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="40%">
    <span>
      <el-form ref="addForm" :model="addForm" label-width="80px">
            <el-input clas="myinput" v-model="addForm.deptcode" placeholder="请输入科室编码"></el-input> 
            <el-input clas="myinput" v-model="addForm.deptname" placeholder="请输入科室名"></el-input>                                
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"  @click="addDeptInfo">确 定</el-button>
    </span>
  </el-dialog>

  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
        tableData: [],
        multipleSelection:[],
        keywords:'',
        dialogVisible:false,
        addForm:{
          deptcode:'',
          deptname:'',
        },
        }
    },
  methods:{
     handleSelectionChange(val) {
        this.multipleSelection = val;
      },
     handleEdit(index, row) {
        console.log(index, row);
      },
     handleDelete(index, row) {
        console.log(index, row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
        this.multipleSelection.push(val);
        console.log(this.multipleSelection);
      },
      //查询用户信息
    getDepts(str){
        //1.向后台服务器发送请求，查询用户列表
        //2.查询结果赋值给tableData
        // var this_=this
        // this.axios({
        //   method:'get',
        //   url:'/getAllUsers?keywords='+str,
        //   // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        // }).then(function(res){
        //     console.log(res.data)
        //     this_.tableData=res.data
        // })
        var this_=this
        this.axios({
          method:'post',
          url:'/getAllDepts',
          data:{'keywords':str} ,
          headers: {'Content-Type': 'application/json'},
        }).then(function(res){
            console.log(res.data)
            this_.tableData=res.data
        })
    },
       //根据条件查询用户信息
      selectDeptByName(){
        this.getDepts(this.keywords)
    },
    addDeptInfo:function(){
      var this_=this;
      if(this.addForm.deptcode!=null&&this.addForm.deptcode!=''
      &&this.addForm.deptname!=null&&this.addForm.deptname!=''){
        this.axios({
          method:'post',
          url:'/addDept',
          data:this.addForm
        }).then(function(){
          alert("部门添加成功");
        this_.dialogVisible=false
        this_.getDepts('')
        });
      }
    },
  },
  mounted:function(){//页面加载完成执行
  //1.向后台服务器发送请求
  //2.查询结果赋值给tableData
  this.getDepts('')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body,html{
  height:100vh;
}
</style>
