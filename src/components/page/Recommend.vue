<template>
<div >
    <div id="friend-graph" style="width: 1000px;height: 800px"></div>
</div>

</template>

<script>
import * as echarts from 'echarts';
export default {
    name:'Recommend',
    props:{

    },
    data(){
        return{

        }
    },
    mounted() {
        this.loadGraph();
    },
    methods:{
        loadGraph(){
            var dom = document.getElementById('friend-graph');
            var myChart = echarts.init(dom);

            var option;
            let userId = sessionStorage.getItem("ms_userId")

            let self = this
            let nodeSize = 30

            const label = {
                fontSize : 18,
                position: 'inside'
            }

            self.$http.get("/friends/recommend",{params:{userId:userId}})
                .then(rep=>{
                if(rep.data.code===200){
                    let result = rep.data.data
                    const edges = [];
                    const nodes = [
                        {
                            fixed: false,
                            x: myChart.getWidth() / 2,
                            y: myChart.getHeight() / 2,
                            symbolSize: nodeSize+10,
                            id: userId,
                            name:sessionStorage.getItem("ms_username"),
                            label:label
                        }
                    ];
                    let id2index = {} //userId map to index
                    id2index[userId] = nodes.length-1
                    option = {
                        series: [
                            {
                                type: 'graph',
                                layout: "force",
                                animation: false,
                                data: nodes,
                                force: {
                                    initLayout: 'circular',
                                    gravity: 0,
                                    repulsion: 600,
                                    edgeLength: 100
                                },
                                edges: edges,
                                label: {
                                    position: 'left',
                                    show: true
                                }
                            }
                        ]
                    };
                    /**
                     * {
                     *         "relationId": 15,
                     *         "userId": 5,
                     *         "friendId": 7,
                     *         "intimacy": 1
                     *       },
                     */
                    let visited = [Number.parseInt(userId)]
                    for(let i=0;i<result.graph.length;i++){
                        let relation = result.graph[i]
                        if(visited.indexOf(relation.userId)===-1){
                            nodes.push({
                                symbolSize: nodeSize,
                                name:relation.userId,
                                id: relation.userId,
                                itemStyle:{
                                    color: "green",
                                    borderWidth: 1,
                                    borderColor : 'red'
                                },
                                label:label
                            })
                            visited.push(relation.userId)
                            id2index[relation.userId] = visited.length-1
                        }
                        if(visited.indexOf(relation.friendId)===-1){
                            nodes.push({
                                symbolSize: nodeSize,
                                name:relation.friendId,
                                id: relation.friendId,
                                itemStyle:{
                                    color: "green",
                                    borderWidth: 1,
                                    borderColor : 'red'
                                },
                                label:label
                            })
                            visited.push(relation.friendId)
                            id2index[relation.friendId] = visited.length-1
                        }
                        edges.push({
                                source: id2index[relation.userId],
                                target: id2index[relation.friendId],
                                lineStyle: {
                                normal: {
                                    curveness: 0.1,
                                    width: 1}
                                }
                            })
                    }

                    console.log(nodes)

                    /**
                     * {
                     *         "friendId": 5,
                     *         "intimacy": 0.22083533365338454
                     *       }
                     */
                    console.log(result.recommend)
                    let maxIntimacy = 0
                    if(result.recommend!==null){
                        for (let i = 0; i < result.recommend.length; i++) {
                            let friend = result.recommend[i]
                            let index = id2index[friend.friendId]
                            nodes[index].itemStyle.color = "purple"
                            maxIntimacy = Math.max(maxIntimacy,friend.intimacy)
                        }
                        for (let i = 0; i < result.recommend.length; i++) {
                            let friend = result.recommend[i]
                            let index = id2index[friend.friendId]
                            nodes[index].symbolSize = Math.ceil(nodeSize * 3*(friend.intimacy/maxIntimacy))
                        }
                    }
                    for(let i=0;i<result.graph.length;i++) {
                        let relation = result.graph[i]
                        if(relation.userId===visited[0]){
                            let index = id2index[relation.friendId]
                            nodes[index].itemStyle.color = "blue"
                        }
                    }
                    if (option && typeof option === 'object') {
                        myChart.setOption(option);
                    }
                    window.addEventListener('resize', myChart.resize);
                    myChart.on('click', function (param) {
                        if (param.dataType === 'node') {
                            if(param.color==="purple"){
                                self.detail(param)
                            }else if(param.color==="blue"){
                                self.deleteFriend(param)
                            }

                        } else {
                            console.log('点击了边',param)
                        }
                    });
                }
            }).then((error) => {
                console.log(error);
            })
        },
        detail(param) {
            let id = param.data.id
            this.$confirm('对方ID:'+id, '添加好友？', {
                confirmButtonText: '添加',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let userId = sessionStorage.getItem("ms_userId")
                let self = this
                self.$http.get("/v2/friend/add",{params:{userId:userId,friendId:id}}).then(rep=>{
                    let result = rep.data
                    if(result.code===200){
                        self.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
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
                    message: '已取消添加'
                });
            });
        },
        deleteFriend(param){
            let id = param.data.id
            this.$confirm('删除后对方好友列表也将失去你。', '删除好友？', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let userId = sessionStorage.getItem("ms_userId")
                let self = this
                self.$http.delete("/friend",{params:{userId:userId,friendId:id}}).then(rep=>{
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
    }
}
</script>

<style>

</style>
