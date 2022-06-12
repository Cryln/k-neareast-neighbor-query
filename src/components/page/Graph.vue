<template>
<div id="graph" style="width: 900px;height: 600px"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name:'Graph',
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
            var dom = document.getElementById('graph');
            var myChart = echarts.init(dom, null, {
                renderer: 'canvas',
                useDirtyRect: false
            });
            var app = {};

            var option;

//{"src": {"name": "April Reiter", "id": 9}, "nodes": [{"id": 1, "name": "Emory Miller", "paths": ["9_to_1"], "neighbor": true}, {"id": 3, "name": "David Ballin", "paths": ["9_to_3"], "neighbor": true}, {"id": 11, "name": "Alice Trotter", "paths": ["9_to_11"], "neighbor": true}, {"id": 18, "name": "Virginia Rios", "paths": ["1_to_18", "11_to_18"], "neighbor": false}, {"id": 19, "name": "Thomas Wheeler", "paths": ["1_to_19", "3_to_19"], "neighbor": false}, {"id": 0, "name": "James Harrell", "paths": ["3_to_0"], "neighbor": false}, {"id": 4, "name": "Nicolas White", "paths": ["3_to_4"], "neighbor": false}, {"id": 5, "name": "Mary Flanagan", "paths": ["3_to_5"], "neighbor": false}, {"id": 7, "name": "Velda Grubb", "paths": ["3_to_7"], "neighbor": false}, {"id": 10, "name": "Arthur Manning", "paths": ["3_to_10", "11_to_10"], "neighbor": false}, {"id": 13, "name": "Victor Ishee", "paths": ["11_to_13"], "neighbor": false}]}
            let mydata = {"src": {"id": 11, "name": "Victor Ishee"}, "nodes": [{"id": 2, "name": "David Ballin", "paths": [{"src": 11, "tar": 2}], "neighbor": true}, {"id": 5, "name": "Thomas Wheeler", "paths": [{"src": 11, "tar": 5}], "neighbor": true}, {"id": 8, "name": "Mary Flanagan", "paths": [{"src": 11, "tar": 8}], "neighbor": true}, {"id": 9, "name": "Velda Grubb", "paths": [{"src": 11, "tar": 9}], "neighbor": true}, {"id": 1, "name": "Emory Miller", "paths": [{"src": 2, "tar": 1}], "neighbor": false}, {"id": 4, "name": "Virginia Rios", "paths": [{"src": 5, "tar": 4}, {"src": 8, "tar": 4}, {"src": 9, "tar": 4}], "neighbor": false}, {"id": 7, "name": "Nicolas White", "paths": [{"src": 5, "tar": 7}], "neighbor": false}, {"id": 13, "name": "Fred Shawler", "paths": [{"src": 5, "tar": 13}], "neighbor": false}, {"id": 17, "name": "Willie Porras", "paths": [{"src": 5, "tar": 17}], "neighbor": false}, {"id": 0, "name": "April Reiter", "paths": [{"src": 8, "tar": 0}, {"src": 9, "tar": 0}], "neighbor": false}, {"id": 3, "name": "Alice Trotter", "paths": [{"src": 8, "tar": 3}], "neighbor": false}, {"id": 10, "name": "Arthur Manning", "paths": [{"src": 8, "tar": 10}, {"src": 9, "tar": 10}], "neighbor": false}, {"id": 12, "name": "Roland Chambless", "paths": [{"src": 8, "tar": 12}], "neighbor": false}, {"id": 19, "name": "Joe Sherman", "paths": [{"src": 8, "tar": 19}], "neighbor": false}]}
            const data = [
                {
                    fixed: false,
                    x: myChart.getWidth() / 2,
                    y: myChart.getHeight() / 2,
                    symbolSize: 20,
                    id: mydata.src.id,
                    name:mydata.src.name
                }
            ];
            let map = {} //userId map to index
            map[mydata.src.id] = data.length-1
            const edges = [];
            option = {
                series: [
                    {
                        type: 'graph',
                        layout: 'force',
                        animation: false,
                        data: data,
                        force: {
                            // initLayout: 'circular',
                            // gravity: 0,
                            repulsion: 100,
                            edgeLength: 5
                        },
                        edges: edges,
                        label: {
                            position: 'left',
                            show: true
                        }
                    }
                ]
            };
            setInterval(function () {
                if(data.length == mydata.nodes.length+1){
                    return;
                }

                let cnode = mydata.nodes[data.length-1];

                data.push({
                    symbolSize: 10,
                    name:cnode.name,
                    id: cnode.id,
                    itemStyle:{
                        color: cnode.neighbor?"blue":"green"
                    }

                });
                console.log("node: "+cnode.id)
                map[cnode.id] = data.length-1
                // var source = Math.round((data.length - 1) * Math.random());
                // var target = Math.round((data.length - 1) * Math.random());
                // if (source !== target) {
                //   edges.push({
                //     source: source,
                //     target: target
                //   });
                // }
                // cnode.paths.forEach(x=>{
                //   edges.push({
                //     source: x.src,
                //     target: x.tar
                //   })
                //   console.log(x.src+"_to_"+x.tar)
                // })

                for(let i=0;i<cnode.paths.length;i++){
                    let x = cnode.paths[i]
                    edges.push({
                        source: map[x.src],
                        target: map[x.tar]
                    })
                    console.log(x.src+"_to_"+x.tar)
                }

                myChart.setOption({
                    series: [
                        {
                            roam: true,
                            data: data,
                            edges: edges
                        }
                    ]
                });
                // console.log('nodes: ' + data.length);
                // console.log('links: ' + data.length);
            }, 200);


            if (option && typeof option === 'object') {
                myChart.setOption(option);
            }

            window.addEventListener('resize', myChart.resize);
        }
    }
}
</script>

<style>

</style>
