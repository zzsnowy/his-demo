<template>
  <el-container style="height: 600px; border: 1px solid #eee">
     <el-header class="header_box">
      <div class="logoTitle">健康云his平台</div>
      <div style="text-align:right;margin-top:20px">
        <router-link to="/login">{{realname}}</router-link>
        <el-link :v-show="showflag" @click="logOut">退出</el-link>
      </div>
      
     </el-header>
     <el-row style="background: #027db4;">
       <el-col :span="3" >
         <el-aside  class="left_box" >
           <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#027db4"
      text-color="#fff"
      active-text-color="#ffd04b">
            <template v-for="ul_one in this.$router.options.routes">
              <el-submenu :index="ul_one.path" :key="ul_one.path" v-if="ul_one.hidden==true">
                <template slot="title">
                   <i class="el-icon-location"></i>
                   <span>{{ul_one.name}}</span>
                </template>
                <el-menu-item :index="ul_two.path" :key="ul_two.path" v-for="ul_two in ul_one.children" @click="addTab(ul_two.path)">
                  {{ul_two.name}}
                </el-menu-item>
               </el-submenu>
            </template>
            </el-menu>
         </el-aside>
       </el-col>
       <el-col :span="21">
          <el-main class="main_box" >
      <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" @tab-click="handleClick" >                
        <el-tab-pane
                  v-for="item in editableTabs"
                  :key="item.name"
                  :label="item.title"
                  :name="item.name"
                >
                  {{item.content}}
                  <router-view/>
                </el-tab-pane>
              </el-tabs>
          </el-main>
       </el-col> 
     </el-row>
    
   
    <el-footer  class="myfooter">

    </el-footer>

  </el-container>
</template>


<script>
export default {
  name: 'home',
  data () {
    return {
     'realname':sessionStorage.getItem("username")==null?'登录':sessionStorage.getItem("username"),
     'showflag':sessionStorage.getItem("username")==null?false:'退出',
     editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 2
      }
  },
   methods:{
    logOut:function(){
    //退出
    this.$router.replace("/login")
    sessionStorage.removeItem("username")

    },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //添加tab页
       addTab(path) {
         console.log(path+"******")
         if(path)
         {//根据组件的路径查找组件
         let compt=null 
           for(let r of this.$router.options.routes)
          {   if(r.children){
                compt=r.children.find(fun=>fun.path==path)
                //当前路径未找到组件，需继续查找，直到找到或循环执行完毕
                if(compt){
                  break;
                }
                
                //function fun(){}
                //fun=>{}
              }
              
           }
           console.log(compt+"****组件**")
           //判断tab中是否有当前要添加的组件
           if(compt){
              if(!this.editableTabs.some(fun=>fun.name==compt.path))
              {
                //将组件封装成tab页
                //let newTabName = ++this.tabIndex + '';
                    this.editableTabs.push({
                      title: compt.name,
                      name: compt.path,
                      route: compt.path
                    });
                   
              }
               this.editableTabsValue = compt.path;
                    //组件显示(路由跳转)
                this.$router.push(compt.path)
             
          }
         
         }
      },
   //编辑tab
   handleTabsEdit(targetName, action) {
        console.log(targetName+"@@@@@@@@@@@@@@@@@@@")
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          //路由跳转
          thihs.$router.push(activeName)
        }
      },
    handleClick(tab,event)
          {
            console.log(tab+"当前");
            this.$router.push(tab.name);
          }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .left_box{
   width:100% !important;
   background:#027db4;
   /* height:300px; */
 }
 .main_box{
   background: #dfe9e8;
   height:600px;
 }
 .logoTitle{
  font-size: 30px;
  text-align: left;
  line-height: 60px;
  color: antiquewhite;
  float: left;
}
.el-col-3{
  width: 10.5%;
}
.el-col-21{
  width: 89.5%;
}
.header_box{
   /* background-size: 100% 100%;  */
   height:60px;
   text-align: center;
   background-color:#74adc7;
}
.myfooter{
  background-color:#74adc7;
  height: 70px;
  width: 100%;
}
.el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 100px;
}
</style>
