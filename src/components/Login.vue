<template>
  <el-container style="height: 100%; background:lightblue">
    
       <el-main class="main_box" >
        <el-card class="card">
         <el-form ref="loginForm" :model="loginForm" label-width="80px" class="login_form">
            <h4>健康云his系统-登录</h4>
            <el-input class="myinput" v-model="loginForm.username" placeholder="请输入用户名"></el-input> 
            <el-input class="myinput" v-model="loginForm.password" placeholder="请输入密码"  show-password></el-input>
            <el-button class="myinput" style="width:240px" type="primary" @click="onSubmit">登录</el-button>
              
         </el-form>
        </el-card>
       </el-main>
    
   </el-container>
</template>


<script>
export default {
  name: 'Login',
  data () {
    return {
     'loginForm':{
     'username':'',
     'password':''
     }
    }
  },
methods:{
      onSubmit:function(){
          //console/log('用户登录提交!');
          var this_=this
          this_.axios({
          method: 'post',
          url: '/userLogin',
          data: this.loginForm
         })
         .then(function (response) {
        //console.log(response.data.msg+"响应成功");
        if(response.data.msg=='登陆成功')
        {
          //跳转到主页，用户信息显示
          this_.$router.replace("/first")
          //用户信息保存到浏览器中
          sessionStorage.setItem("username",response.data.userInfo.realname)
          console.log(response.data.userInfo.realname)

        }
        })
      .catch(function (error) {
        console.log(error+"请求服务器出错");
      });
     }
   }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .main_box{
   background:url('../assets/Login.png') no-repeat center #ccc;
   background-size: 100% 100%; 
   height:900px;
 }
.header_box{
  text-align: center;
   font-size: 40px;
   background:lightblue
}
.card{
  width:420px;
    margin-left: 36%;
    margin-top: 10%;
  background-color: rgba(200,200,200,0.5);
  border-color:rgba(200,200,200,0.5);
  border-radius:10px
}
.login_form{
    width:340px;
    height:300px;
    padding:20px;/*填充*/
    text-align: center;
}

.myinput{
    margin:15px;/*元素边距*/
    width:300px;
    opacity:1;
}
</style>
