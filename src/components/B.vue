<template>
  <el-container style="height: 100%; background:lightblue">
    
      B-组件
    
   </el-container> 
</template>


<script>
export default {
  name: 'B',
  data () {
    return {
     
    }
  },
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
  boder-color:rgba(200,200,200,0.5);
  boder-radius:10px
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
