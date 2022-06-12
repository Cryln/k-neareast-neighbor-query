<template>
    <el-table
        :data="this.friends"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
            prop="id"
            label="ID"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="昵称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="account"
            label="账号">
        </el-table-column>
        <el-table-column
                         fixed="right"
                         label="操作"
                         width="100">
            <template slot-scope="scope">
                <el-button @click="interact(scope.row)" type="text" size="small">互动</el-button>
                <el-button @click="deleteFriend(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: "FriendList",
    mounted() {
        this.loadFriends()
    },
    methods:{
        loadFriends(){
            let id = sessionStorage.getItem("ms_userId");
            this.$http.get("/friends",{params:{id:id}}).then(rep=>{
                console.log(rep.data)
                this.friends = rep.data.data;
            })
        },
        tableRowClassName({row,index}){
            // if(row.sex==="man"){
            //     return "man-friend"
            // }else{
            //     return "woman-friend"
            // }
            return "man-friend"
        },
        interact(row){
            // console.log(row);
            let postData = {
                userId: sessionStorage.getItem("ms_userId"),
                friendId: row.id,
                intimacy: 3
            }
            let self = this
            self.$http.post("/friends/interact",postData).then(rep=>{
                console.log(rep.data);
                self.$message({
                    type: 'success',
                    message: '互动成功!'
                });
            });
        },
        deleteFriend(row){
            this.$confirm('删除后对方好友列表也将失去你。', '删除好友？', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let userId = sessionStorage.getItem("ms_userId")
                let self = this
                self.$http.delete("/friend",{params:{userId:userId,friendId:row.id}}).then(rep=>{
                    let result = rep.data
                    if(result.code===200){
                        self.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        self.$forceUpdate()
                    }else{
                        self.$message({
                            type: 'error',
                            message: result.msg
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        }
    },

    data(){
        return{
            friends:[]
        }
    }
}
</script>

<style scoped>

</style>
